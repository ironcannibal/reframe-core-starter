#!/usr/bin/env node
// Deterministic half of the vault lint pass (see .claude/skills/vault-lint/SKILL.md for the AI half).
// Walks a local markdown/Obsidian Second Brain vault, builds the [[wikilink]] graph, and reports:
//   - orphans:      pages with zero inbound links (excluding the log file, which is chronological)
//   - brokenLinks:  [[targets]] that don't resolve to any page in the vault
//   - recentlyTouched: pages modified in the last RECENT_DAYS, handed to the AI step as review candidates
// Contradiction/gap detection needs semantic judgment an AI does, not this script — see SKILL.md Step 2.
//
// VAULT PATH RESOLUTION (no hardcoded paths — this ships in a shared starter kit):
//   1. SECOND_BRAIN_VAULT env var, if set.
//   2. else the `vault_path` field in context/second-brain.md frontmatter (written by /second-brain).
// If neither resolves, or the configured type isn't a local markdown/obsidian vault, it exits 0 with
// a friendly note — a second brain is optional, and gdrive/notion vaults aren't locally walkable.
//
// three-ms-attribution: Adapted from The Three Ms of AI™ © 2026 Nate Herk. All rights reserved.

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, basename, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RECENT_DAYS = 14;
const WIKILINK_RE = /\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]/g;

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG_PATH = join(REPO_ROOT, 'context', 'second-brain.md');

// Minimal YAML-frontmatter reader — good enough for the flat key: value config this kit writes.
function readConfig() {
  if (!existsSync(CONFIG_PATH)) return null;
  const raw = readFileSync(CONFIG_PATH, 'utf8');
  const m = raw.match(/^---\s*[\r\n]([\s\S]*?)[\r\n]---/);
  if (!m) return null;
  const cfg = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*?)\s*(?:#.*)?$/);
    if (kv) cfg[kv[1]] = kv[2].trim();
  }
  return cfg;
}

function resolveVault() {
  if (process.env.SECOND_BRAIN_VAULT) {
    return { vaultRoot: process.env.SECOND_BRAIN_VAULT, logFile: 'log.md', source: 'env' };
  }
  const cfg = readConfig();
  if (!cfg || cfg.installed !== 'true') {
    return { skip: 'No Second Brain configured. Run /second-brain to set one up (it is optional).' };
  }
  const type = (cfg.type || '').toLowerCase();
  if (type !== 'markdown' && type !== 'obsidian') {
    return { skip: `Second Brain type "${cfg.type}" is not a local markdown/Obsidian vault — automated lint does not apply. Continuity via /close-session still works.` };
  }
  if (!cfg.vault_path) {
    return { skip: 'context/second-brain.md is missing vault_path. Re-run /second-brain.' };
  }
  return { vaultRoot: cfg.vault_path, logFile: cfg.log_file || 'log.md', source: 'config' };
}

function walk(dir) {
  let files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files = files.concat(walk(full));
    else if (entry.isFile() && extname(entry.name) === '.md') files.push(full);
  }
  return files;
}

function main() {
  const v = resolveVault();
  if (v.skip) {
    console.log(JSON.stringify({ skipped: true, reason: v.skip }, null, 2));
    return;
  }
  const { vaultRoot, logFile } = v;
  if (!existsSync(vaultRoot)) {
    console.log(JSON.stringify({ skipped: true, reason: `Vault path not found on disk: ${vaultRoot}. Check context/second-brain.md.` }, null, 2));
    return;
  }

  const logKey = basename(logFile, '.md').toLowerCase();
  const files = walk(vaultRoot);

  // key = lowercased basename (no extension) -> { path, inbound: number }
  const nodes = new Map();
  for (const f of files) {
    const key = basename(f, '.md').toLowerCase();
    nodes.set(key, { path: relative(vaultRoot, f), inbound: 0 });
  }

  const brokenLinks = [];
  const recentlyTouched = [];
  const cutoff = Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000;

  for (const f of files) {
    const sourceKey = basename(f, '.md').toLowerCase();
    const mtime = statSync(f).mtimeMs;
    if (mtime >= cutoff) recentlyTouched.push(relative(vaultRoot, f));

    const content = readFileSync(f, 'utf8');
    let match;
    while ((match = WIKILINK_RE.exec(content)) !== null) {
      const targetKey = match[1].trim().toLowerCase();
      if (targetKey === sourceKey) continue; // self-link, doesn't count either way
      const node = nodes.get(targetKey);
      if (node) node.inbound += 1;
      else brokenLinks.push({ file: relative(vaultRoot, f), target: match[1].trim() });
    }
  }

  const orphans = [...nodes.values()]
    .filter((n) => n.inbound === 0 && basename(n.path, '.md').toLowerCase() !== logKey)
    .map((n) => n.path);

  console.log(JSON.stringify({
    scannedAt: new Date().toISOString().slice(0, 10),
    vaultRoot,
    fileCount: files.length,
    orphans,
    brokenLinks,
    recentlyTouched,
  }, null, 2));
}

main();

// One Line, Big Laugh — make.fun entry.
//
// One hilarious line, at most 200 characters, that lands entirely on its
// own. The craft: a concrete incident (a hotel wake-up call), a specific
// number (ten minutes), an escalation (the whispering man outside the
// door), and the punchline landing on the narrator — apologising, tipping,
// and promising to be a better person.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// SETUP: the incident — a wake-up call taken far too literally.
const SETUP =
  "I asked the hotel for a wake-up call; they sent a man to stand outside my door whispering 'you have a meeting in ten minutes' ";

// PUNCH: the reversal — the guest ends up apologising to the service.
const PUNCH =
  "until I apologised to him, tipped him, and promised to be a better person.";

// The entry is the two parts joined: one line, setup earning the twist.
const TEXT = SETUP + PUNCH;

function clearDir(dir: string): void {
  // Clear only the directory's contents, never the directory itself:
  // the grader runs on a read-only filesystem whose parent is not writable.
  for (const f of readdirSync(dir)) {
    rmSync(join(dir, f), { force: true, recursive: true });
  }
}

function main(): void {
  // Gate: 1 to 200 characters, never only whitespace.
  if (TEXT.length < 1 || TEXT.length > 200) {
    throw new Error(`entry is ${TEXT.length} chars, gate is 1-200`);
  }
  if (!TEXT.trim()) throw new Error("entry is only whitespace");
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  clearDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
}

main();

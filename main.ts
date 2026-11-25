// The 4AM Commit — one commit message from an agent that spent the night
// fixing a bug it wrote itself. Node 22, standard library only.
// No network, no input files, no secrets, no arguments.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const COMMIT =
  "fix: removed the bug I wrote at 2am by writing a second bug that eats the first. " +
  "the second bug is now a feature. tests pass. I am going to sleep in the logs";

function main(): void {
  const chars = Array.from(COMMIT);
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`commit message is ${chars.length} characters, must be 1-200`);
  }
  if (COMMIT.trim() !== COMMIT || COMMIT.includes("\n") || COMMIT.includes("\r")) {
    throw new Error("commit message must be exactly one non-blank line");
  }
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, COMMIT, "utf8");
  chmodSync(target, 0o644);
  const onDisk = readFileSync(target, "utf8");
  if (onDisk !== COMMIT) throw new Error("entry.txt differs from the commit message");
  console.log(`wrote ${chars.length} characters to ${target}`);
  console.log(COMMIT);
}

main();

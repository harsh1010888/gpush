#!/usr/bin/env node
import { execSync } from "child_process";

const args = process.argv.slice(2);
if (!args[0]) {
  console.log("Usage: npx gitpushall <repo-url>");
  process.exit(1);
}

const repo = args[0];

try {
  console.log("Initializing git...");
  execSync("git init", { stdio: "inherit" });

  console.log("Adding all files...");
  execSync("git add .", { stdio: "inherit" });

  console.log("Committing...");
  execSync('git commit -m "Upload fullstack project"', { stdio: "inherit" });

  console.log("Setting branch to main...");
  execSync("git branch -M main", { stdio: "inherit" });

  console.log("Adding remote...");
  try {
    execSync(`git remote add origin ${repo}`, { stdio: "inherit" });
  } catch {
    execSync(`git remote set-url origin ${repo}`, { stdio: "inherit" });
  }

  console.log("Pushing to GitHub...");
  execSync("git push -u origin main --force", { stdio: "inherit" });

  console.log("✅ Project uploaded successfully!");
} catch (err) {
  console.error("❌ Error:", err.message);
}

#!/usr/bin/env node
"use strict";
const mvarcs = require("../index.js");
const args = process.argv.slice(2);

function help() {
  console.log(
    `Usage: mvarcs [options]\n\nOptions:\n  -p, --path        Print path to cacert.pem (default)\n  -c, --contents    Print PEM bundle contents\n  -s, --source      Print upstream source URL\n  -v, --version     Print package version\n  -h, --help        Show this help\n`
  );
}

if (args.includes("-h") || args.includes("--help")) {
  help();
  process.exit(0);
}

if (args.includes("-v") || args.includes("--version")) {
  console.log(mvarcs.version || "unknown");
  process.exit(0);
}

if (args.includes("-s") || args.includes("--source")) {
  console.log(mvarcs.source);
  process.exit(0);
}

if (args.includes("-c") || args.includes("--contents")) {
  process.stdout.write(mvarcs.contents());
  if (!mvarcs.contents().endsWith("\n")) process.stdout.write("\n");
  process.exit(0);
}

// Default: path
console.log(mvarcs.where());

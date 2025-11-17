const assert = require("assert");
const fs = require("fs");
const { spawnSync } = require("child_process");
const mvarcs = require("./index.js");

try {
  const fileLocation = mvarcs.where();
  assert.ok(fileLocation.includes("cacert.pem"), "mvarcs.where() not expected");
  console.log("OK: mvarcs.where() returns path", fileLocation);
} catch (err) {
  console.error("TEST FAILED:", err.message);
  process.exit(1);
}

try {
  const content = fs.readFileSync(mvarcs, "utf8");
  assert.ok(
    content.includes("BEGIN CERTIFICATE"),
    "cacert.pem found but file does not contain BEGIN CERTIFICATE"
  );
  console.log("OK: cacert.pem found and contains BEGIN CERTIFICATE");
} catch (err) {
  console.error("TEST FAILED:", err.message);
  process.exit(1);
}

try {
  const content = mvarcs.contents();
  assert.ok(
    content.includes("BEGIN CERTIFICATE"),
    "mvarcs.contents() resolves but does not contain BEGIN CERTIFICATE"
  );
  console.log("OK: mvarcs.contents() resolves and contains BEGIN CERTIFICATE");
} catch (err) {
  console.error("TEST FAILED:", err.message);
  process.exit(1);
}

try {
  const versionFromPackage = JSON.parse(
    fs.readFileSync("package.json", "utf8")
  ).version;
  const ver = mvarcs.version;
  assert.ok(
    ver.includes(versionFromPackage),
    "mvarcs.version does not resolve to the expected version"
  );
  console.log(
    "OK: mvarcs.version resolves to the expected version",
    versionFromPackage
  );
} catch (err) {
  console.error("TEST FAILED:", err.message);
  process.exit(1);
}

// CLI tests
function runCLI(args) {
  const res = spawnSync("node", ["bin/mvarcs.js", ...args], { encoding: "utf8" });
  if (res.error) throw res.error;
  return { stdout: res.stdout.trim(), stderr: res.stderr.trim(), status: res.status };
}

try {
  const r = runCLI([]);
  assert.ok(r.stdout.includes("cacert.pem"), "CLI default (path) output invalid");
  assert.strictEqual(r.status, 0, "CLI default exit code not 0");
  console.log("OK: CLI default path output");
} catch (err) {
  console.error("TEST FAILED (CLI path):", err.message);
  process.exit(1);
}

try {
  const r = runCLI(["-c"]);
  assert.ok(r.stdout.includes("BEGIN CERTIFICATE"), "CLI contents missing certificate header");
  console.log("OK: CLI -c contents output");
} catch (err) {
  console.error("TEST FAILED (CLI contents):", err.message);
  process.exit(1);
}

try {
  const r = runCLI(["-s"]);
  assert.ok(r.stdout.startsWith("https://"), "CLI -s source not an https URL");
  console.log("OK: CLI -s source output");
} catch (err) {
  console.error("TEST FAILED (CLI source):", err.message);
  process.exit(1);
}

try {
  const pkgVersion = JSON.parse(fs.readFileSync("package.json", "utf8")).version;
  const r = runCLI(["-v"]);
  assert.strictEqual(r.stdout, pkgVersion, "CLI -v version mismatch");
  console.log("OK: CLI -v version output");
} catch (err) {
  console.error("TEST FAILED (CLI version):", err.message);
  process.exit(1);
}

try {
  const r = runCLI(["-h"]);
  assert.ok(r.stdout.includes("Usage:"), "CLI -h help missing Usage header");
  console.log("OK: CLI -h help output");
} catch (err) {
  console.error("TEST FAILED (CLI help):", err.message);
  process.exit(1);
}

process.exit(0);

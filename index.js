#!/usr/bin/env node
"use strict";
const { join } = require("path");
const { readFileSync } = require("fs");
const { URL } = require("url");

const certPath = join(__dirname, "src", "mvarcs", "cacert.pem");
const source =
  "https://raw.githubusercontent.com/markcerts/mvarcs/refs/heads/main/cacert.pem";

const mvarcs = new URL("file://" + certPath);
mvarcs.where = () => certPath;
mvarcs.contents = (encoding = "utf8") => readFileSync(certPath, encoding);
mvarcs.source = source;
mvarcs.version = "0.0.3";

module.exports = mvarcs;

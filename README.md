# mvarcs: Mark Verifying Authority Root Certificates for Node.js

mvarcs provides the Mark Verifying Authority (MVA) Root Certificate bundle for validating the trustworthiness of Mark Certificates such as Verified Mark Certificates (VMC) and Common Mark Certificates (CMC) used in BIMI (Brand Indicators for Message Identification).

The bundle lets you embed a stable, versioned set of root certificates in your Node.js application.

## Installation

```sh
npm install mvarcs
```

## Exported API

Requiring the package returns a `URL` local file object enhanced with helper functions:

```js
const mvarcs = require('mvarcs');

mvarcs.where();      // Absolute filesystem path to the bundled cacert.pem
mvarcs.contents();   // String contents of the PEM bundle
mvarcs.source;       // Upstream canonical source URL
mvarcs.version;      // The package version matching the PEM bundle version
```

Example:

```js
const mvarcs = require('mvarcs');
console.log(mvarcs.where());
// /usr/local/lib/node_modules/.../mvarcs/src/mvarcs/cacert.pem

console.log(mvarcs.contents().slice(0, 120));
// -----BEGIN CERTIFICATE-----\nMIIF... (truncated)
```

## CLI Usage

```sh
npm install -g mvarcs
mvarcs       # prints path to cacert.pem
mvarcs -c    # prints PEM bundle contents
mvarcs -s    # prints upstream source URL
mvarcs -v    # prints package version
mvarcs -h    # help text
```

## Addition or Removal of Certificates

Please see the upstream project for policies and contribution guidelines:
<https://github.com/markcerts/mvarcs>

## Integrity and Security Notes

- Always review changes between releases; root certificates represent trust anchors.
- Pin the package version in `package.json` for reproducible builds.
- Consider verifying downloaded artifacts against expected fingerprints if you implement auto‑updates externally.

## Testing

A minimal test is included (`test.js`):

```sh
# npm test
node test.js
```

# shelljs-plugin-open

[![GitHub Actions](https://img.shields.io/github/actions/workflow/status/shelljs/plugin-open/main.yml?style=flat-square&logo=github)](https://github.com/shelljs/plugin-open/actions/workflows/main.yml)
[![npm](https://img.shields.io/npm/v/shelljs-plugin-open.svg?style=flat-square)](https://www.npmjs.com/package/shelljs-plugin-open)
[![shelljs-plugin](https://img.shields.io/badge/shelljs-plugin-brightgreen.svg?style=flat-square)](https://github.com/shelljs/shelljs/wiki/Using-ShellJS-Plugins)

A [ShellJS](https://github.com/shelljs/shelljs) plugin for the `open()` command
to open a file (or URL) with its default application. This is largely based on
[opener](https://github.com/domenic/opener).

This is designed to imitate the `open` command on macOS. Here's the
equivalent commands for other systems:

 - macOS

   ```bash
   $ open file.txt # opens in a text editor
   ```

 - Linux

   ```bash
   $ xdg-open file.txt # opens in a text editor
   ```

 - Windows

   ```
   > start file.txt
   ```

## Installation

```bash
$ npm install --save shelljs
$ npm install --save shelljs-plugin-open
```

## Usage

ShellJS unofficially has the capacity for plugins (the API is likely to change a
bit) since v0.7.1. Although we *don't recommend* developing for this yet, this
plugin is designed to test that API, and we will adapt it along with changes to
ShellJS up until official plugin support. To use this plugin, you must use
exactly version v0.7.1 (although, eventually this will support v1.0.0+).

To use this plugin in your project, include it like so:

```javascript
var shell = require('shelljs');
require('shelljs-plugin-open');

// Ex. usage:
shell.open('file.txt'); // the plugin is now available!
```

## Supported systems

 - Linux (all variants)
 - macOS
 - Windows

This is supported for Node v0.11+

## Writing plugins

If you're interested in taking a look at the current state of the plugin API,
take a look at [index.js](index.js). This has helpful comments explaining the
necessary boilerplate for writing a plugin. For an example usage of the plugin,
take a look at [test/test.js](test/test.js).

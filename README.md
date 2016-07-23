# shelljs-plugin-open

A [ShellJS](https://github.com/shelljs/shelljs) plugin for the `open()` command
to open a file with its default application.

This is designed to imitate the `open` command on Mac OS X. Here's the
equivalent commands for other systems:

 - Mac OS X
   ```bash
   $ open file.txt # opens in a text editor
   ```
 - Linux
   ```bash
   $ xdg-open file.txt # opens in a text editor
   ```
 - Windows
   ```
   > file.txt
   ```

## Installation

```bash
$ npm install --save --save-exact shelljs@0.7.1 # currently requires exactly this ShellJS version
$ npm install --save github:shelljs/plugin-open
```

## Usage

ShellJS unofficially supports plugins (the API is likely to change a bit) since
v0.7.1. This plugin is a test of that API, and will adapt along with it. To use
this plugin, you must use exactly version v0.7.1 (although, eventually this will
support v1.0.0+).

To use this plugin in your project, include it like so:

```javascript
var shell = require('shelljs');
require('shelljs-plugin-open');

// Ex. usage:
shell.open('file.txt'); // the plugin is now available!
```

## Supported systems

 - Linux (all variants)
 - OS X
 - Windows

This is only supported for Node v4+

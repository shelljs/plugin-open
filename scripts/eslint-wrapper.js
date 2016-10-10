#!/usr/bin/env node

var exec = require('child_process').exec;

// var version = process.version;
var version = process.version.substr(1).split('.');
if (parseInt(version[0], 10) >= 4) {
  exec('eslint .', { stdio: 'inherit' }, function (code) {
    process.exit(code);
  });
} else {
  console.log('Linting is only supported on node v4+');
  process.exit(0);
}

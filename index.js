// This exposes the plugin utilities
var plugin = require('shelljs/plugin');

// Require whatever modules you need for your project
var opener = require('opener');
var fs = require('fs');

var pathExistsSync = function (filePath) {
  try {
    fs.accessSync(filePath);
    return true;
  } catch (e) {
    return false;
  }
};

// Implement your command in a function, which accepts `options` as the
// first parameter, and other arguments after that
function open(options, fileName) {
  var URL_REGEX = /^https?:\/\/.*/;

  if (!pathExistsSync(fileName) && !fileName.match(URL_REGEX)) {
    plugin.error('Unable to locate file: ' + fileName);
  }

  var proc = opener(fileName);
  proc.unref();
  proc.stdin.unref();
  proc.stdout.unref();
  proc.stderr.unref();
  return '';
}

// Register the new plugin as a ShellJS command
plugin.register('open', open, {
  cmdOptions: {}, // There are no supported options for this command
});

// Optionally, you can export the implementation of the command like so:
exports.open = open;

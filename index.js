// This exposes the plugin utilities
var plugin = require('shelljs/plugin');

// Require whatever modules you need for your project
var child = require('child_process');
var fs = require('fs');

// Implement your command in a function, which accepts `options` as the
// first parameter, and other arguments after that
function open(options, fileName) {
  var URL_REGEX = /^https?:\/\/.*/;

  if (!fs.existsSync(fileName) && !fileName.match(URL_REGEX)) {
    plugin.error('Unable to locate file: ' + fileName);
  }

  var cmd;
  if (process.platform.match(/^win/))
    cmd = 'start';
  else if (process.platform.match(/^linux/))
    cmd = 'xdg-open';
  else // assume it's Mac OS X, which uses `open`
    cmd = 'open';

  child.exec(cmd + ' ' + JSON.stringify(fileName));
  return '';
}

// Register the new plugin as a ShellJS command
plugin.register('open', open, {
  globStart: 1,     // Start globbing at the first non-option argument
  cmdOptions: {},   // There are no supported options for this command
  wrapOutput: true, // Wrap the output in a ShellString
});

// Optionally, you can export the implementation of the command like so:
exports.open = open;

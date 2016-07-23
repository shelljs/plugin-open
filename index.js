// This exposes the plugin utilities
var plugin = require('shelljs/src/common');

// Require whatever modules you need for your project
var child = require('child_process');
var shell = require('shelljs');
var fs = require('fs');

// Implement your command in a function, which takes an options string as the
// first parameter
function open(options, fileName) {
  // Use the plugin utils to parse the options to only those options that are
  // available (in this case, there are no available options
  options = plugin.parseOptions(options, {
  });

  var URL_REGEX = /^https?:\/\/.*/;

  if (!fs.existsSync(fileName) && !fileName.match(URL_REGEX)) {
    plugin.error('Unable to locate file: ' + fileName);
  }

  if (process.platform.match(/^win/)) {
    // a shell call using only the filename
    child.exec('start ' + fileName);
  } else if (process.platform.match(/^linux/)) {
    // xdg-open is fairly reliable
    child.exec('xdg-open ' + JSON.stringify(fileName));
  } else {
    // assume it's Mac OS X, which uses `open()`
    child.exec('open ' + JSON.stringify(fileName));
  }
  return new shell.ShellString('', '', 0);
}

// Register the new plugin as a ShellJS command
plugin.register('open', open, { globStart: 1 });

// Optionally, you can export the implementation of the command like so:
exports.open = open;

var plugin = require('shelljs/src/common');
var child = require('child_process');
var shell = require('shelljs');
var fs = require('fs');

//@
//@ ### open([options,] file [, file ...])
//@ ### open([options,] file_array)
//@ Examples:
//@
//@ ```javascript
//@ open('file.jpg');
//@ ```
//@
//@ Opens files with their default application
function open(options, source) {
  options = plugin.parseOptions(options, {
  });

  if (!fs.existsSync(source)) {
    plugin.error('Unable to locate file: ' + source);
  }

  if (process.platform.match(/^win/)) {
    // a shell call using only the filename
    child.exec(source);
  } else if (process.platform.match(/^linux/)) {
    // xdg-open is fairly reliable
    child.exec('xdg-open ' + JSON.stringify(source));
  } else {
    // assume it's Mac OS X, which uses `open()`
    child.exec('open ' + JSON.stringify(source));
  }
  return new shell.ShellString('', '', 0);
}

plugin.register('open', open, { globStart: 1 });

exports.open = open;

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
function open(options, fileName) {
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

plugin.register('open', open, { globStart: 1 });

exports.open = open;

/* globals describe, it, open */

/*
 * Using ShellJS Plugins:
 *
 * To learn how to use a ShellJS plugin, look for the comments following the
 * slash-star/star-slash syntax.
 */

/*
 * Load all your plugins first:
 * You can load a plugin with either of the following syntaxes:
 * `require('shelljs-plugin-open');` or
 * `var pluginOpen = require('shelljs-plugin-open');`
 *
 * Here, we've opted to save it in a variable, allowing us the option to use the
 * bare function in addition to shell.open() (which includes helpful ShellJS
 * features)
 */
var pluginOpen = require('..');
// If we were using additional plugins, we could load them here

/*
 * After that, you must load in ShellJS itself, either locally (recommended) or
 * globally (which still supported). For the purposes of testing this plugin,
 * we're actually testing both ways of importing ShellJS (but you would never
 * want to use ShellJS like this normally):
 */
var shell = require('shelljs'); // recommended
require('shelljs/global');      // not recommended

/*
 * Now, require whichever other modules you want to require:
 */
require('should');
var assert = require('assert');

// override console.error() to cover up common.error() calls
console.error = function () { };

describe('plugin-open', function () {
  it('gets added to the shelljs instance', function () {
    /*
     * Plugins automatically add new commands to the ShellJS instance, such as
     * shell.open()
     */
    shell.open.should.be.type('function');
  });

  it('gets added to the global namespace for shelljs/global', function () {
    /*
     * Plugins are also compatible with using require('shelljs/global');
     */
    global.open.should.be.type('function');
    global.open.should.equal(shell.open);
  });

  it('does not override other commands or methods', function () {
    /*
     * Plugins shouldn't interfere with existing commands
     */
    shell.cp.should.be.type('function');
    shell.mv.should.be.type('function');
    shell.ls().should.have.property('toEnd');
    shell.ls().should.have.property('grep');
    shell.ls().should.have.property('sed');
  });

  it('exports the plugin implementation', function () {
    /*
     * A plugin author can also export the implementation of their commands
     */
    pluginOpen.should.be.type('object');
    pluginOpen.should.have.property('open');
    pluginOpen.open.should.be.type('function');
  });

  it('does not accept options/flags', function () {
    /*
     * Plugins are an easy way of specifying what options/flags your command
     * supports
     */
    var ret = shell.open('-f', 'test');
    ret.code.should.equal(1);
    ret.stdout.should.equal('');
    var errorMsg = 'open: option not recognized: f';
    ret.stderr.should.equal(errorMsg);
    shell.error().should.equal(errorMsg);
  });

  it('cannot open files that are missing', function () {
    var ret = shell.open('missingFile.txt');
    ret.code.should.equal(1);
    ret.stdout.should.equal('');
    var errorMsg = 'open: Unable to locate file: missingFile.txt';
    ret.stderr.should.equal(errorMsg);
    shell.error().should.equal(errorMsg);
    ret = open('missingFile.txt');
    ret.code.should.equal(1);
    ret.stdout.should.equal('');
    ret.stderr.should.equal(errorMsg);
    shell.error().should.equal(errorMsg);
  });

  it('opens URLs', function () {
    var ret = shell.open('https://www.google.com');
    ret.code.should.equal(0);
    assert.ok(!ret.stderr);
    assert.ok(!shell.error());
  });

  it('opens files asynchronously', function () {
    var ret = shell.open('test/');

    // if this gets to this point, it must have been asynchronous
    ret.code.should.equal(0);
    ret.stdout.should.equal('');
    assert.ok(!ret.stderr);
    assert.ok(!shell.error());
  });

  it('handles glob characters', function () {
    /*
     * Plugins can easily take advantage of ShellJS's built-in glob expansion.
     * This is indicated by the globStart option
     */
    var ret = shell.open('te?t/*st.js');
    ret.code.should.equal(0);
    ret.stdout.should.equal('');
    assert.ok(!ret.stderr);
    assert.ok(!shell.error());
  });
});

const argv = require('minimist')(process.argv.slice(2));

function getComponentsFilePaths() {
  return argv._;
}

function getTestsRoot() {
  const testsRoot = argv.testsRoot;

  return typeof testsRoot === 'string'
    ? testsRoot
    : null;
}

module.exports = {
  getComponentsFilePaths,
  getTestsRoot
};

const argv = process.argv;

function getComponentsFilePaths() {
  return argv.slice(2, argv.length - 1);
}

function getTestsRoot() {
  return argv.pop();
}

module.exports = {
  getComponentsFilePaths,
  getTestsRoot
};

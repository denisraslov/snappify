function logMessage(msg) {
  console.log(msg)
}

function logError(msg) {
  logMessage(`⚠️ ${msg}`);
}

function logNoTSInterfaceFoundError(fileName, interfaceName) {
  logError(`${fileName}: Can't find a TypeScript props interface ${interfaceName}. This file was skipped.`);
}

function logNoComponentWithTSInterfaceFoundError(fileName) {
  logError(`${fileName}: doesn't contain a React component with a TypeScript props interface. This file was skipped.`);
}

function logTestsFileIsExistError(testsFileName) {
  logError(`${testsFileName} was already created before. The file was not overwritten.`)
}

function logNotSupportedTypesError(fileName, notSupportedTypes) {
  logError(`${fileName}: The TypeScript props interface contains not supported types: ` +
    notSupportedTypes.join(',') + `. This file was skipped.`)
}

function logNoInterfaceItemsFoundError(fileName) {
  logError(`${fileName}: Can't find any items in the TypeScript props interface. ` +
    `This file was skipped. More likely, you used commas instead of semicolons as delimiters.`)
}

function logNoFilesError() {
  logError('Please, set a glob pattern for React components written with TypeScript!');
}

function logNoTestsRootError() {
  logError('Please, set a name of a folder to create test files into!');
}

function logProcessingStart() {
  logMessage(`🚀 Snappify is processing your React components...`);
}

function logTestCreatedMessage(fileName) {
  logMessage(`${fileName}: Test file for was created! 📸`)
}

module.exports = {
  logError,
  logNoTSInterfaceFoundError,
  logNoComponentWithTSInterfaceFoundError,
  logTestsFileIsExistError,
  logNotSupportedTypesError,
  logNoInterfaceItemsFoundError,
  logNoFilesError,
  logNoTestsRootError,
  logProcessingStart,
  logTestCreatedMessage
};

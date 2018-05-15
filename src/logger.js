function logMessage(msg) {
  console.log(msg)
}

function logError(msg) {
  logMessage(`⚠️ ${msg}`);
}

function logNoTSInterfaceFoundError(fileName, interfaceName) {
  logError(`Can't find a TypeScript props interface ${interfaceName} in ${fileName}. This file was skipped.`);
}

function logNoComponentWithTSInterfaceFoundError(fileName) {
  logError(`${fileName} doesn't contain a React component with a TypeScript props interface. This file was skipped.`);
}

function logTestsFileIsExistError(testsFileName) {
  logError(`${testsFileName} was already created before. The file was not overwritten.`)
}

function logNotSupportedTypesError(fileName, notSupportedTypes) {
  logError(`The props of ${fileName} contain not supported types: ` +
    notSupportedTypes.join(',') + `. This file was skipped.`)
}

function logTestCreatedMessage(fileName) {
  logMessage(`Test file for ${fileName} was created! 📸`)
}

module.exports = {
  logNoTSInterfaceFoundError,
  logNoComponentWithTSInterfaceFoundError,
  logTestsFileIsExistError,
  logNotSupportedTypesError,
  logTestCreatedMessage
};

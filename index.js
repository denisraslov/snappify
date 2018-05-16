#!/usr/bin/env node

const argsReader = require('./src/argsReader');
const getComponentsFilePaths = argsReader.getComponentsFilePaths;
const getTestsRoot = argsReader.getTestsRoot;

const parseComponent = require('./src/componentReader').parseComponent;
const writeTestsFile = require('./src/testsWriter').writeTestsFile;

const valuesGenerator = require('./src/valuesGenerator');
const getInvalidTypes = valuesGenerator.getInvalidTypes;

const logger = require('./src/logger');
const logProcessingStart = logger.logProcessingStart;
const logNoInterfaceItemsFoundError = logger.logNoInterfaceItemsFoundError;
const logNotSupportedTypesError = logger.logNotSupportedTypesError;

const componentFilePaths = getComponentsFilePaths();
const testsRoot = getTestsRoot();

function run() {
  logProcessingStart();
  processFiles(componentFilePaths);
}

function processFiles(componentFilePaths) {
  // Walk the files with the components
  componentFilePaths.forEach((componentPath) => {
    createTestFileForComponent(componentPath);
  });
}

function validateProps(componentPath, props, enums) {
  if (!props.length) {
    logNoInterfaceItemsFoundError(componentPath);
    return false;
  }

  const invalidTypes = getInvalidTypes(props, enums);
  if (invalidTypes.length) {
    logNotSupportedTypesError(
      componentPath,
      invalidTypes.map(item => item.type)
    );
    return false;
  }

  return true;
}

function createTestFileForComponent(componentPath) {
  parseComponent(componentPath)
    .then(({ name, types, enums }) => {
      // console.log(`Interface types with values: ` +
      //   `\n${typesWithValues.map(obj => JSON.stringify(obj) + '\n')}`);

      if (!validateProps(componentPath, types, enums)) {
        return;
      }

      writeTestsFile(
        name,
        componentPath,
        types,
        enums,
        testsRoot
      );
    })
    .catch((error) => {});
}

run();

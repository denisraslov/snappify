#!/usr/bin/env node

const parseComponent = require('./src/componentReader').parseComponent;
const writeTestsFile = require('./src/testsWriter').writeTestsFile;

const logger = require('./logger');
const logError = logger.logError;

const componentFilePaths = process.argv.slice(2, process.argv.length - 1);
const testsRoot = process.argv.pop();

function createTestFileForComponent(componentPath) {
  parseComponent(componentPath)
    .then(({ name, types, enums }) => {
      // console.log(`Interface types with values: ` +
      //   `\n${typesWithValues.map(obj => JSON.stringify(obj) + '\n')}`);

      writeTestsFile(
        name,
        componentPath,
        types,
        enums,
        testsRoot
      );
    })
    .catch((error) => {
      logError(error.toString());
    });
}

// Walk the files with the components
componentFilePaths.forEach((componentPath) => {
  createTestFileForComponent(componentPath);
});

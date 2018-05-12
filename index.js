#!/usr/bin/env node

const parseComponent = require('./src/componentReader').parseComponent;
const generateValue = require('./src/valuesGenerator');
const writeTestsFile = require('./src/testsWriter').writeTestsFile;

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
    .catch((error) => {});
}

// Walk the files with the components
componentFilePaths.forEach((componentPath) => {
  createTestFileForComponent(componentPath);
});

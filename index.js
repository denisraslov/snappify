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

      // if (notSupportedTypes.length === 0) {
      //   writeTestsFile(
      //     name,
      //     componentPath,
      //     typesWithValues,
      //     enums,
      //     testsRoot
      //   );
      // } else {
      //   console.log(`⚠️ The props of ${componentPath} contain not supported types: ` +
      //     notSupportedTypes.map(item => item.type).join(',') +
      //     `. This file was skipped.`)
      // }
    })
    .catch((error) => {
      console.log(error);
    });
}

// Walk the files with the components
componentFilePaths.forEach((componentPath) => {
  // console.log(componentPath);
  createTestFileForComponent(componentPath);
});

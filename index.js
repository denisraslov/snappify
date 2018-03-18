const getPropsInterfaceTypes = require('./reader.js').getPropsInterfaceTypes;
const generateValue = require('./valuesGenerator.js');
const writeTestFile = require('./writer.js').writeTestFile;

const componentFilePaths = process.argv.slice(2, process.argv.length - 1);
const testsRoot = process.argv.pop();

function getComponentNameFromPath(path) {
  return path
    .split('/').pop()
    .split('.').shift();
}

function createTestFileForComponent(componentPath) {
  getPropsInterfaceTypes(componentPath)
    .then(({ types, enums }) => {
      const typesWithValues = types.map((item) => {
        return Object.assign(item, {
          value: generateValue(item.type, item.name, enums)
        });
      });

      // console.log(`Interface types with values: ` +
      //   `\n${typesWithValues.map(obj => JSON.stringify(obj) + '\n')}`);

      // A type is not supported if we didn't generate a value for it.
      const notSupportedTypes = typesWithValues
        .filter(item => item.type !== 'undefined' && item.value === undefined);

      if (notSupportedTypes.length === 0) {
        writeTestFile(
          getComponentNameFromPath(componentPath),
          componentPath,
          typesWithValues,
          enums,
          testsRoot
        );
      } else {
        console.log(`⚠️ The props of ${componentPath} contain not supported types: ` +
          notSupportedTypes.map(item => item.type).join(',') +
          `. This file was skipped.`)
      }
    })
    .catch((error) => {});
}

// Walk the files with the components
componentFilePaths.forEach((componentPath) => {
  // console.log(componentPath);
  createTestFileForComponent(componentPath);
});

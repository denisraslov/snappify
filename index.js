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
    .then((types) => {
      const typesWithValues = types.map((item) => {
        return Object.assign(item, {
          value: generateValue(item.type, item.name)
        });
      });

      console.log(`Interface types with values: ` +
        `\n${typesWithValues.map(obj => JSON.stringify(obj) + '\n')}`);

      writeTestFile(
        getComponentNameFromPath(componentPath),
        componentPath,
        typesWithValues,
        testsRoot
      );
    })
    .catch((error) => {});
}

// Walk the files with the components
componentFilePaths.forEach((componentPath) => {
  console.log(componentPath);
  createTestFileForComponent(componentPath);
});

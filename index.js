const getPropsInterfaceTypes = require('./reader.js').getPropsInterfaceTypes;
const generateValue = require('./valuesGenerator.js');
const getArg = require('./argGetter.js');
const writeTestFile = require('./writer.js').writeTestFile;

const componentPath = getArg('path');

if (!componentPath) {
  throw new Error('Pass the path argument');
}

function getComponentNameFromPath(path) {
  return componentPath
    .split('/').pop()
    .split('.').shift();
}

getPropsInterfaceTypes(componentPath).then((types) => {
  const typesWithValues = types.map((item) => {
    return Object.assign(item, {
      value: generateValue(item.name, item.type)
    });
  });

  console.log(`Interface types with values: ` +
    `\n${typesWithValues.map(obj => JSON.stringify(obj) + '\n')}`);

  writeTestFile(
    getComponentNameFromPath(componentPath),
    componentPath,
    typesWithValues
  );
});

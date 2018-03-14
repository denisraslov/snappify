const getPropsInterfaceTypes = require('./reader.js');
const generateValue = require('./valuesGenerator.js');
const getArg = require('./argGetter.js');

const componentPath = getArg('path');

if (!componentPath) {
  throw new Error('Pass the path argument');
}

getPropsInterfaceTypes(componentPath).then((types) => {
  const typesWithValues = types.map((item) => {
    return Object.assign(item, {
      value: generateValue(item.name, item.type)
    });
  });

  console.log(`Interface types with values: ` +
    `\n${typesWithValues.map(obj => JSON.stringify(obj) + '\n')}`);
});

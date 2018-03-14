const fs = require('fs');

function readFile(fileName, callback) {
  fs.readFile(fileName, 'utf8', function(err, data) {
      if (err) throw err;
      callback(data);
  });
}

function findPropsInterface(text) {
    const interfaceNameRegExp = /React.(Component|PureComponent|StatelessComponent)<(.*?)(>|,)/g;
    const interfaceNameMatch = interfaceNameRegExp.exec(text);

    if (interfaceNameMatch) {
      const interfaceName = interfaceNameMatch[2];

      console.log(`Component interface was found: ${interfaceName}`);

      const interfaceRegExp = new RegExp(`interface ${interfaceName} {(.*?)}`);
      const interfaceMatch = interfaceRegExp.exec(text);

      if (interfaceMatch) {
        const interfaceText = interfaceMatch[1].replace(/ /g, '');

        const typeStrings = interfaceText.split(';');
        // Remove the last item because it's empty
        typeStrings.pop();

        const types = typeStrings.map(string => {
          const nameAndType = string.trim().split(':');
          const name = nameAndType[0];
          let type = nameAndType
            .filter((item, i) => i > 0)
            .join(':');

          if (type.includes('=>')) {
            type = 'function';
          }

          return {
            name: nameAndType[0].replace(/\?/g, ''),
            type,
            required: name[name.length - 1] !== '?'
          };
        });

        console.log(`Interface types: \n${types.map(obj => JSON.stringify(obj) + '\n')}`);

        return types;
      }
    }
}

function getPropsInterfaceTypes(fileName) {
  return new Promise((resolve) => {
    readFile(fileName, (content) => {
      const contentWithoutComments = content.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
      const contentWithoutLineBreaks = contentWithoutComments.replace(/\n|\r/g, '');
      const types = findPropsInterface(contentWithoutLineBreaks.trim());

      resolve(types);
    });
  });
}

module.exports = getPropsInterfaceTypes;

const fs = require('fs');

function readFile(fileName, callback) {
  fs.readFile(fileName, 'utf8', function(err, data) {
      if (err) throw err;
      callback(data);
  });
}

function findPropsInterface(text, fileName) {
    const interfaceNameRegExp = /React.(Component|PureComponent|StatelessComponent)<(.*?)(>|,)/g;
    const interfaceNameMatch = interfaceNameRegExp.exec(text);

    if (interfaceNameMatch) {
      const interfaceName = interfaceNameMatch[2];

      // console.log(`Component interface was found: ${interfaceName}`);

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

          return {
            name: nameAndType[0].replace(/\?/g, ''),
            type,
            required: name[name.length - 1] !== '?'
          };
        });

        // console.log(`Interface types: \n${types.map(obj => JSON.stringify(obj) + '\n')}`);

        return types;
      } else {
        console.log(`⚠️ Can't find a TypeScript props interface ${interfaceName} in ${fileName}. This file was skipped.`)
      }
    } else {
      console.log(`⚠️ ${fileName} doesn't contain a React component with a TypeScript props interface. This file was skipped.`)
    }
}

function getPropsInterfaceTypes(fileName) {
  return new Promise((resolve, reject) => {
    readFile(fileName, (content) => {
      const contentWithoutComments = content.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
      const contentWithoutLineBreaks = contentWithoutComments.replace(/\n|\r/g, '');
      const types = findPropsInterface(contentWithoutLineBreaks.trim(), fileName);

      if (types) {
        resolve(types);
      } else {
        reject();
      }
    });
  });
}

module.exports = {
  readFile,
  getPropsInterfaceTypes
};

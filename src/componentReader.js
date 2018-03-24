const fs = require('fs');

function readFile(fileName, callback) {
  fs.readFile(fileName, 'utf8', function(err, data) {
      if (err) throw err;
      callback(data);
  });
}

function findExportedEnums(text, fileName) {
  const enumRegExp = /export enum(.*?){(.*?)}/g;
  const enumMatches = text.match(enumRegExp);

  if (enumMatches) {
    const enums = enumMatches.map((matchText) => {
      const enumMatch = (/export enum(.*?){(.*?)}/g).exec(matchText);
      const enumName = enumMatch[1].trim();
      const enumItems = enumMatch[2].split(',').map(item => item.trim());

      return {
        name: enumName,
        items: enumItems
      };
    });

    return enums;
  }
}

function findComponentName(text, fileName) {
  const statelessComponentNameRegExp = /(.*):(.*?)React.StatelessComponent/g;
  const statelessComponentMatches = statelessComponentNameRegExp.exec(text);
  let componentName;

  if (statelessComponentMatches) {
    componentName = statelessComponentMatches[1].trim().split(' ').pop().trim();
  } else {
    const componentNameRegExp =
      /class(.*?)extends(.*?)React.(Component|PureComponent|StatelessComponent)/g;
    const componentMatches = componentNameRegExp.exec(text);

    if (componentMatches) {
      componentName = componentMatches[1].trim().split(' ').pop().trim();
    }
  }

  return componentName;
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

function prepareTextForParsing(text) {
  const textWithoutComments = text.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
  const textWithoutLineBreaks = textWithoutComments.replace(/\n|\r/g, '');

  return textWithoutLineBreaks.trim();
}

function getPropsInterfaceTypes(fileName) {
  return new Promise((resolve, reject) => {
    readFile(fileName, (content) => {
      const preparedContent = prepareTextForParsing(content);

      const name = findComponentName(preparedContent, fileName);
      const types = findPropsInterface(preparedContent, fileName);
      const enums = findExportedEnums(preparedContent, fileName);

      if (types) {
        resolve({ name, types, enums });
      } else {
        reject();
      }
    });
  });
}

module.exports = {
  readFile,
  prepareTextForParsing,
  findComponentName,
  findExportedEnums,
  getPropsInterfaceTypes
};
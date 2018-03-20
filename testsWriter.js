const fs = require('fs');
const readFile = require('./reader.js').readFile;
const generateAllPropAttributes = require('./propsGenerator.js').generateAllPropAttributes;
const generateRequiredPropAttributes = require('./propsGenerator.js').generateRequiredPropAttributes;

function writeFile(fileName, content, callback) {
  fs.writeFile(fileName, content, (err) => {
      if (err) throw err;
      callback(content);
  });
}

function generateTest(componentName, id, propsText) {
  return new Promise((resolve) => {
    readFile('templates/testTemplate.tpl', (template) => {
      let testContent = template.replace(/\$COMPONENT_NAME/g, componentName);
      testContent = testContent
        .replace(/\$TEST_ID/g, id)
        .replace(
          /\$COMPONENT_PROPS/g,
          propsText
        ) + '\n';

      resolve(testContent);
    });
  });
}

function createFolder(path) {
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
}

function generateComponentImportStatement(componentName, enums) {
  let result = componentName;

  if (enums) {
    result += ', { '+ enums
      .map(item => item.name)
      .join(', ') + ' }';
  }

  return result;
}

async function generateTestsFile(
  componentPath,
  componentName,
  enums,
  props,
  callback
) {
  const allPropsTestContent = await generateTest(
    componentName,
    'with all the props',
    generateAllPropAttributes(props)
  );

  const requiredPropsTestContent = await generateTest(
    componentName,
    'with all the props',
    generateAllPropAttributes(props)
  );

  readFile('templates/fileTemplate.tpl', (content) => {
    let fileContent = content.replace(/\$COMPONENT_IMPORT/g,
      generateComponentImportStatement(componentName, enums));
    fileContent = fileContent.replace(/\$COMPONENT_PATH/g, componentPath);
    fileContent = fileContent.replace(/\$TESTS/g,
      allPropsTestContent + requiredPropsTestContent
    );

    if (callback) {
      callback(fileContent);
    }
  });
}

function writeTestsFile(componentName, componentPath, props, enums, testsRoot) {
  generateTestsFile(
    componentPath,
    componentName,
    enums,
    props,
    (fileContent) => {
      // Create tests root folder
      createFolder(testsRoot);

      const componentFolders = componentPath.split('/');
      componentFolders.shift();
      componentFolders.pop();
      const componentFolderPath = componentFolders.join('/');
      const testPath = `${testsRoot}/${componentFolderPath}`;

      if (componentFolderPath) {
        createFolder(testPath);
      }

      writeFile(`${testPath}/${componentName}.js`, fileContent, () => {
        console.log(`Test file for ${componentPath} was created! 📸`);
      });
    }
  )
}

module.exports = {
  generateTest,
  generateTestsFile,
  writeTestsFile
};

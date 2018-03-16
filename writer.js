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

function generateTest(template, id, propsText) {
  return template
    .replace(/\$TEST_ID/g, id)
    .replace(
      /\$COMPONENT_PROPS/g,
      propsText
    ) + '\n';
}

function createFolder(path) {
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }
}

function writeTestFile(componentName, componentPath, props, testsRoot) {
  readFile('templates/testTemplate.tpl', (content) => {
      let testContent = content.replace(/\$COMPONENT_NAME/g, componentName);
      let testsContent = '';

      testsContent += generateTest(
        testContent,
        'with all the props',
        generateAllPropAttributes(props)
      );

      testsContent += generateTest(
        testContent,
        'with the required props',
        generateRequiredPropAttributes(props)
      );

      readFile('templates/fileTemplate.tpl', (content) => {
        let fileContent = content.replace(/\$COMPONENT_NAME/g, componentName);
        fileContent = fileContent.replace(/\$COMPONENT_PATH/g, componentPath);
        fileContent = fileContent.replace(/\$TESTS/g, testsContent);

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
      });
  });
}

module.exports = {
  writeTestFile
};

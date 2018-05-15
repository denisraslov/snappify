const fs = require('fs');

const valuesGenerator = require('./valuesGenerator');
const getValuesSetForTypes = valuesGenerator.getValuesSetForTypes;

const generatePropAttributes = require('./propsGenerator').generatePropAttributes;

const logger = require('./logger');
const logTestsFileIsExistError = logger.logTestsFileIsExistError;
const logTestCreatedMessage = logger.logTestCreatedMessage;

const testsFileTemplate =
`import React from 'react';
import renderer from 'react-test-renderer';

import $COMPONENT_IMPORT from '$COMPONENT_PATH';

$TESTS`;

const testTemplate =
`test('$COMPONENT_NAME $TEST_ID', () => {
  const tree = renderer.create(
    <$COMPONENT_NAME
      $COMPONENT_PROPS
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
`;

function writeFile(fileName, content, callback) {
  fs.writeFile(fileName, content, (err) => {
    if (err) throw err;
    callback(content);
  });
}

function generateTest(componentName, id, propsText) {
  let testContent = testTemplate.replace(/\$COMPONENT_NAME/g, componentName);

  testContent = testContent
    .replace(/\$TEST_ID/g, id)
    .replace(
      /\$COMPONENT_PROPS/g,
      propsText
    ) + '\n';

  return testContent;
}

function createFolder(path) {
  const folders = path.split('/');

  folders.forEach((folder, i) => {
    const folderPath = folders.slice(0, i + 1).join('/');

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  });
}

function generateComponentImportStatement(componentName, enums) {
  let result = componentName;

  if (enums) {
    result += ', { ' + enums
      .map(item => item.name)
      .join(', ') + ' }';
  }

  return result;
}

function getTestContents(componentName, props, enums) {
  const TESTS_PER_FILE = 10;
  const valuesSet = getValuesSetForTypes(props, enums);

  const tests = valuesSet
    .filter((test, i) => {
      if (valuesSet.length > TESTS_PER_FILE) {
        const segmentSize = Math.round(valuesSet.length / TESTS_PER_FILE);

        return i % segmentSize === 0;
      } else {
        return true;
      }
    })
    .slice(0, TESTS_PER_FILE)
    .map((values, i) => {
      return generateTest(
        componentName,
        `Case #${i + 1}`,
        generatePropAttributes(props, values)
      );
    });

  return tests;
}

function generateTestsFile(
  componentPath,
  componentName,
  enums,
  props
) {
  const tests = getTestContents(componentName, props, enums).join('');

  let fileContent = testsFileTemplate.replace(/\$COMPONENT_IMPORT/g,
    generateComponentImportStatement(componentName, enums));
  fileContent = fileContent.replace(/\$COMPONENT_PATH/g, componentPath);
  fileContent = fileContent.replace(/\$TESTS/g, tests);

  return fileContent;
}

function getComponentNameFromPath(path) {
  return path
    .split('/').pop()
    .split('.').shift();
}

function writeTestsFile(
  componentName,
  componentPath,
  props,
  enums,
  testsRoot
) {
  const fileContent = generateTestsFile(
    componentPath,
    componentName,
    enums,
    props
  );

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

  const testsFileName =
    `${testPath}/${getComponentNameFromPath(componentPath)}.js`;

  if (!fs.existsSync(testsFileName)) {
    writeFile(testsFileName, fileContent, () => {
      logTestCreatedMessage(componentPath);
    });
  } else {
    logTestsFileIsExistError(testsFileName);
  }
}

module.exports = {
  getTestContents,
  generateTest,
  generateTestsFile,
  writeTestsFile
};

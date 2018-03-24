const generateTest = require('./../src/testsWriter').generateTest;
const generateTestsFile = require('./../src/testsWriter').generateTestsFile;

const expectedTestContent =
`test(\'ComponentName TestID\', () => {
  const tree = renderer.create(
    <ComponentName
      id=1
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

`;

const expectedTestsFileContent =
`import React from 'react';
import renderer from 'react-test-renderer';

import ComponentName, { Enum1, Enum2 } from 'components/index.tsx';

test(\'ComponentName with all the props', () => {
  const tree = renderer.create(
    <ComponentName
      prop1={1}
      prop2={value2}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

test(\'ComponentName with the required props\', () => {
  const tree = renderer.create(
    <ComponentName
      prop1={1}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

`;

test('Test generation', () => {
  const testContent = generateTest(
    'ComponentName', 'TestID', 'id=1'
  );

   expect(testContent).toEqual(expectedTestContent);
});

test('Tests file generation', () => {
  const testContent = generateTestsFile(
    'components/index.tsx',
    'ComponentName',
    [
      {
        name: 'Enum1'
      },
      {
        name: 'Enum2'
      }
    ],
    [
      {
        name: 'prop1',
        value: 1,
        required: true
      },
      {
        name: 'prop2',
        value: 'value2',
        required: false
      }
    ]
  );

   expect(testContent).toEqual(expectedTestsFileContent);
});

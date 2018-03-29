const generateTest = require('./../src/testsWriter').generateTest;
const generateTestsFile = require('./../src/testsWriter').generateTestsFile;
const getTestContents = require('./../src/testsWriter').getTestContents;

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

test(\'ComponentName Case #1', () => {
  const tree = renderer.create(
    <ComponentName
      prop1={''}
      prop2={false}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

test(\'ComponentName Case #2\', () => {
  const tree = renderer.create(
    <ComponentName
      prop1={''}
      prop2={true}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

test(\'ComponentName Case #3', () => {
  const tree = renderer.create(
    <ComponentName
      prop1={'value'}
      prop2={false}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

test(\'ComponentName Case #4\', () => {
  const tree = renderer.create(
    <ComponentName
      prop1={'value'}
      prop2={true}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

`;

const propTypes = [
  {
    name: 'prop1',
    type: 'string',
    required: true
  },
  {
    name: 'prop2',
    type: 'boolean',
    required: true
  }
];

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
    propTypes
  );

   expect(testContent).toEqual(expectedTestsFileContent);
});

test('Test cases count', () => {
  expect(getTestContents('ComponentName', propTypes).length)
    .toBeLessThanOrEqual(10);
});

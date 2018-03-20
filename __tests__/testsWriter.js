const generateTest = require('./../testsWriter').generateTest;

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

test('Test generation', async () => {
  const testContent = await generateTest(
    'ComponentName', 'TestID', 'id=1'
  );

   expect(testContent).toEqual(expectedTestContent);
});

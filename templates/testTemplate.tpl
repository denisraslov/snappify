test('$COMPONENT_NAME $TEST_ID', () => {
  const tree = renderer.create(
    <$COMPONENT_NAME
      $COMPONENT_PROPS
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

import valuesGenerator from './../src/valuesGenerator';

const getValuesSetForRanges = valuesGenerator.getValuesSetForRanges;

test('Values sets from ranges', () => {
  expect(getValuesSetForRanges([
    [false, true],
    [0, 1]
  ]))
  .toEqual([
    [false, 0], [false, 1], [true, 0], [true, 1]
  ]);
});

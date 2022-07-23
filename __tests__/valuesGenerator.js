import valuesGenerator from './../src/valuesGenerator'

const getValuesSetForRanges = valuesGenerator.getValuesSetForRanges
const getTypeValuesRange = valuesGenerator.getTypeValuesRange
const getInvalidTypes = valuesGenerator.getInvalidTypes

test('Values sets from ranges', () => {
  expect(
    getValuesSetForRanges([
      [false, true],
      [0, 1],
    ])
  ).toEqual([
    [false, 0],
    [false, 1],
    [true, 0],
    [true, 1],
  ])
})

test('Return undefined on a unknown type', () => {
  expect(getTypeValuesRange('UnknownType')).toEqual(undefined)
  expect(getTypeValuesRange('UnknownType', true)).toEqual(undefined)
})

test('Return invalid types', () => {
  expect(
    getInvalidTypes([
      {
        type: 'UnknownType',
      },
    ]).length
  ).toEqual(1)

  expect(
    getInvalidTypes([
      {
        type: 'UnknownType',
      },
      {
        type: 'string',
      },
    ]).length
  ).toEqual(1)

  expect(
    getInvalidTypes([
      {
        type: 'number',
      },
      {
        type: 'string',
      },
    ]).length
  ).toEqual(0)
})

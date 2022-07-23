const componentReader = require('./../../src/componentReader')
const prepareTextForParsing = componentReader.prepareTextForParsing
const findExportedEnums = componentReader.findExportedEnums

const enumsText = `export enum ButtonTypes {
    MAIN_PRIMARY,
    MAIN_SECONDARY,
    CONFIRM_PRIMARY
}

export enum Types {
    Item1,
    Item2
}`

test('Enums parsing', () => {
  expect(findExportedEnums(prepareTextForParsing(enumsText))).toEqual([
    {
      name: 'ButtonTypes',
      items: ['MAIN_PRIMARY', 'MAIN_SECONDARY', 'CONFIRM_PRIMARY'],
    },
    {
      name: 'Types',
      items: ['Item1', 'Item2'],
    },
  ])
})

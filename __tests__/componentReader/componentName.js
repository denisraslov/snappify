const componentReader = require('./../../src/componentReader')
const prepareTextForParsing = componentReader.prepareTextForParsing
const findComponentName = componentReader.findComponentName

const componentDefinitionText1 = `something class Button1 extends React.Component<IButtonProps> { something`
const componentDefinitionText2 = `class Button2 extends React.Component`
const componentDefinitionText3 = `something class Button3 extends React.PureComponent<IButtonProps> { something`
const componentDefinitionText4 = `class Button4 extends React.PureComponent`

test('Component name parsing', () => {
  expect(
    findComponentName(prepareTextForParsing(componentDefinitionText1))
  ).toEqual('Button1')

  expect(
    findComponentName(prepareTextForParsing(componentDefinitionText2))
  ).toEqual('Button2')

  expect(
    findComponentName(prepareTextForParsing(componentDefinitionText3))
  ).toEqual('Button3')

  expect(
    findComponentName(prepareTextForParsing(componentDefinitionText4))
  ).toEqual('Button4')
})

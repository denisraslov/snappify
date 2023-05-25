const componentReader = require('./../../src/componentReader')
const prepareTextForParsing = componentReader.prepareTextForParsing
const findComponentName = componentReader.findComponentName

const statelessComponentDefinitionText1 = `const Button1:React.StatelessComponent<IButtonProps> = (props) => {`
const statelessComponentDefinitionText2 = `const Button2 : React.StatelessComponent<IButtonProps> = (props) => {`
const statelessComponentDefinitionText3 = `Button3 : React.StatelessComponent<IButtonProps> = (props) => {`
const statelessComponentDefinitionText4 = `Button4 : React.FunctionComponent<IButtonProps> = (props) => {`
const statelessComponentDefinitionText5 = `Button5 : React.SFC<IButtonProps> = (props) => {`
const statelessComponentDefinitionText6 = `Button6 : React.FC<IButtonProps> = (props) => {`

test('Stateless component name parsing', () => {
  expect(
    findComponentName(prepareTextForParsing(statelessComponentDefinitionText1))
  ).toEqual('Button1')

  expect(
    findComponentName(prepareTextForParsing(statelessComponentDefinitionText2))
  ).toEqual('Button2')

  expect(
    findComponentName(prepareTextForParsing(statelessComponentDefinitionText3))
  ).toEqual('Button3')

  expect(
    findComponentName(prepareTextForParsing(statelessComponentDefinitionText4))
  ).toEqual('Button4')

  expect(
    findComponentName(prepareTextForParsing(statelessComponentDefinitionText5))
  ).toEqual('Button5')

  expect(
    findComponentName(prepareTextForParsing(statelessComponentDefinitionText6))
  ).toEqual('Button6')
})

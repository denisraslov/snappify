const componentReader = require('./../../src/componentReader')
const prepareTextForParsing = componentReader.prepareTextForParsing
const findPropsInterface = componentReader.findPropsInterface

const propsIntefaceText1 = `interface IButtonProps {
    prop1: string;
    prop2?: (name: string, value: string) => void;
}

export default class Button extends React.Component<IButtonProps, IButtonState> {
`

const propsIntefaceText2 = `interface IButtonProps {
    prop1: string;
    prop2?: (name: string, value: string) => void;
}

const Button:React.StatelessComponent<IButtonProps> = (props) => {
`

const parsedProps = [
  {
    name: 'prop1',
    required: true,
    type: 'string',
  },
  {
    name: 'prop2',
    required: false,
    type: '(name:string,value:string)=>void',
  },
]

test('Props interface parsing', () => {
  expect(findPropsInterface(prepareTextForParsing(propsIntefaceText1))).toEqual(
    parsedProps
  )

  expect(findPropsInterface(prepareTextForParsing(propsIntefaceText2))).toEqual(
    parsedProps
  )
})

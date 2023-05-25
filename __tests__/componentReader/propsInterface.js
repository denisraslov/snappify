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

const propsIntefaceText3 = `interface IButtonProps {
  prop1: string;
  prop2?: (name: string, value: string) => void;
}

const Button:React.FunctionComponent<IButtonProps> = (props) => {
`

const propsIntefaceText4 = `interface IButtonProps {
  prop1: string;
  prop2?: (name: string, value: string) => void;
}

const Button:React.SFC<IButtonProps> = (props) => {
`

const propsIntefaceText5 = `interface IButtonProps {
  prop1: string;
  prop2?: (name: string, value: string) => void;
}

const Button:React.FC<IButtonProps> = (props) => {
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

  expect(findPropsInterface(prepareTextForParsing(propsIntefaceText3))).toEqual(
    parsedProps
  )

  expect(findPropsInterface(prepareTextForParsing(propsIntefaceText4))).toEqual(
    parsedProps
  )

  expect(findPropsInterface(prepareTextForParsing(propsIntefaceText5))).toEqual(
    parsedProps
  )
})

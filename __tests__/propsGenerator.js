const generateAllPropAttributes = require('./../propsGenerator.js').generateAllPropAttributes;
const generateRequiredPropAttributes = require('./../propsGenerator.js').generateRequiredPropAttributes;

const PROP_DELIMITER = '\n            ';

const propTypes = [
  {
    name: 'name',
    value: 'value',
    required: true
  },
  {
    name: 'age',
    value: 28,
    required: true
  },
  {
    name: 'isValid',
    value: false,
    required: false
  },
  {
    name: 'onClick',
    value: '() => 1',
    required: false
  },
  {
    name: 'items',
    value: '[1,2,3]',
    required: false
  }
];

test('All props generation', () => {
    expect(generateAllPropAttributes(propTypes)).toBe(
      ['name={value}', 'age={28}', 'isValid={false}',
        'onClick={() => 1}', 'items={[1,2,3]}'].join(PROP_DELIMITER)
    );
});

test('Required props generation', () => {
    expect(generateRequiredPropAttributes(propTypes)).toBe(
      ['name={value}', 'age={28}'].join(PROP_DELIMITER)
    );
});

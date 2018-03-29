const generatePropAttributes = require('./../src/propsGenerator').generatePropAttributes;;

const PROP_DELIMITER = '\n      ';

const propTypes = [
  {
    name: 'name'
  },
  {
    name: 'age'
  },
  {
    name: 'isValid'
  },
  {
    name: 'onClick'
  },
  {
    name: 'items'
  }
];

const values = ['\'value\'', '28', 'false', undefined, 'null'];

test('Props generation', () => {
    expect(generatePropAttributes(propTypes, values)).toBe(
      ['name={\'value\'}', 'age={28}',
        'isValid={false}', 'items={null}'].join(PROP_DELIMITER)
    );
});

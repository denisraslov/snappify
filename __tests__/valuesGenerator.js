import generateValue from './../src/valuesGenerator';

test('String generation', () => {
  expect(generateValue('string', 'field')).toBe('\'field value\'');
  expect(generateValue('string')).toBe('\'value\'');
  expect(generateValue('string[]')).toBe('[\'value\', \'value\']');
  expect(generateValue('Array<string>')).toBe('[\'value\', \'value\']');
  expect(generateValue('()=>string')).toBe('() => \'value\'');
});

test('Null generation', () => {
  expect(generateValue('null', 'field')).toBe('null');
  expect(generateValue('null')).toBe('null');
  expect(generateValue('null[]')).toBe('[null, null]');
  expect(generateValue('Array<null>')).toBe('[null, null]');
  expect(generateValue('()=>null')).toBe('() => null');
});

test('Boolean generation', () => {
  const boolValues = [false, true];

  expect(boolValues).toContain(generateValue('boolean', 'field'));
  expect(boolValues).toContain(generateValue('boolean'));

  const arrayOfBool1 = JSON.parse(generateValue('boolean[]'));
  arrayOfBool1.forEach(value => expect(boolValues).toContain(value));

  const arrayOfBool2 = JSON.parse(generateValue('Array<boolean>'));
  arrayOfBool2.forEach(value => expect(boolValues).toContain(value));

  const func = generateValue('()=>boolean');
  expect(boolValues).toContain(eval(`(${func})()`));
});

test('Enum value generation', () => {
  const enumItems = ['PRIMARY', 'SECONDARY', 'TEXT'];
  const expectedEnumValues = ['Type.PRIMARY', 'Type.SECONDARY', 'Type.TEXT'];

  expect(expectedEnumValues).toContain(generateValue('Type', 'field', [
    {
      name: 'Type',
      items: enumItems
    }
  ]));
});

test('Unsupported type value generation', () => {
  expect(generateValue('UnsupportedType', 'field')).toBe(undefined);
});

import generateValue from './../valuesGenerator';

test('String generation', () => {
  expect(generateValue('string', 'field')).toBe('\'field value\'');
  expect(generateValue('string')).toBe('\'value\'');
  expect(generateValue('string[]')).toBe('[\'value\', \'value\']');
  expect(generateValue('Array<string>')).toBe('[\'value\', \'value\']');
  expect(generateValue('()=>string')).toBe('() => \'value\'');
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

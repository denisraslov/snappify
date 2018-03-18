import generateValue from './../valuesGenerator';

test('String generation', () => {
    expect(generateValue('string', 'field')).toBe('\'field value\'');
    expect(generateValue('string')).toBe('\'value\'');
    expect(generateValue('string[]')).toBe('[\'value\', \'value\']');
    expect(generateValue('Array<string>')).toBe('[\'value\', \'value\']');
    expect(generateValue('()=>string')).toBe('() => \'value\'');
});

function getRandomInt(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

function generatePrimitiveValue(type, fieldName) {
  if (type === 'void' || type === 'undefined') {
    return 'undefined';
  }

  if (type === 'null') {
    return 'null';
  }

  if (type === 'string') {
    return fieldName
      ? `\'${fieldName} value\'`
      : '\'value\'';
  }

  if (type === 'number' || type === 'any') {
    return getRandomInt(0, 100);
  }

  if (type === 'boolean') {
    return !!getRandomInt(0, 1);
  }

  if (type === 'object') {
    return '{}';
  }

  if (type === 'React.ReactNode') {
    return '<div />';
  }

  if (type === 'React.CSSProperties') {
    return '{ padding: 0 }';
  }
}

function generateArrayValue(type) {
  return `[${generatePrimitiveValue(type)}, ${generatePrimitiveValue(type)}]`;
}

function generateFunctionValue(type) {
  return `() => ${generatePrimitiveValue(type)}`;
}

function generateValue(type, fieldName) {
  let value = generatePrimitiveValue(type, fieldName);

  if (!value) {
    if (type.includes('[]')) {
      value = generateArrayValue(type.substr(type, type.length - 2));
    }

    if (type.includes('Array')) {
      value = generateArrayValue(type.substr(6, type.length - 7));
    }

    if (type.includes('=>')) {
      value = generateFunctionValue(type.split('=>').pop());
    }
  }

  return value;
}

module.exports = generateValue;

function getRandomInt(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

function generatePrimitiveValue(type, fieldName, enums) {
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

  if (enums) {
    const typeEnum = enums.find(item => item.name === type);
    if (typeEnum) {
      const enumItem = typeEnum.items[getRandomInt(0, typeEnum.items.length - 1)];
      return `${type}.${enumItem}`;
    }
  }
}

function isTypeSupported(type, enums) {
  return generatePrimitiveValue(type, undefined, enums) !== undefined;
}

function generateArrayValue(type, enums) {
  if (isTypeSupported(type, enums)) {
    return `[${generatePrimitiveValue(type, undefined, enums)}, ` +
      `${generatePrimitiveValue(type, undefined, enums)}]`
  };
}

function generateFunctionValue(type, enums) {
  if (isTypeSupported(type, enums)) {
    return `() => ${generatePrimitiveValue(type, undefined, enums)}`;
  }
}

function generateValue(type, fieldName, enums) {
  let value = generatePrimitiveValue(type, fieldName, enums);

  if (!value) {
    if (type.includes('[]')) {
      const itemType = type.substr(type, type.length - 2);
      value = generateArrayValue(itemType, enums);
    }

    if (type.includes('Array')) {
      const itemType = type.substr(6, type.length - 7);
      value = generateArrayValue(itemType, enums);
    }

    if (type.includes('=>')) {
      const returnType = type.split('=>').pop();
      value = generateFunctionValue(returnType, enums);
    }
  }

  return value;
}

module.exports = generateValue;

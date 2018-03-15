function getRandomInt(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

function generateValue(fieldName, type) {
  if (type === 'string') {
    return `${fieldName} value`;
  }

  if (type === 'number') {
    return getRandomInt(0, 100);
  }

  if (type === 'boolean') {
    return !!getRandomInt(0, 1);
  }

  if (type === 'function') {
    return '() => {}';
  }

  if (type === 'object') {
    return '{}';
  }

  if (type === 'React.ReactNode') {
    return '<div />';
  }
}

module.exports = generateValue;

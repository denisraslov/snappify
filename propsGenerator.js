const PROP_DELIMITER = '\n            ';

function generateAllPropAttributes(props) {
  return props.map((prop) => {
    const isStringValue = prop.type === 'string';
    const decoratorChar = isStringValue ? '\'' : '';
    const propValueString =
      decoratorChar +
      prop.value +
      decoratorChar;
    const propString = `${prop.name}={${propValueString}}`;

    return propString;
  }).join(PROP_DELIMITER);
}

function generateRequiredPropAttributes(props) {
  return generateAllPropAttributes(
    props.filter(item => item.required)
  );
}

module.exports = {
  generateAllPropAttributes,
  generateRequiredPropAttributes
};

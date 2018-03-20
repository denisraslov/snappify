const PROP_DELIMITER = '\n      ';

function generateAllPropAttributes(props) {
  return props.map((prop) => {
    return `${prop.name}={${prop.value}}`;
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

const PROP_DELIMITER = '\n      '

function generatePropAttributes(props, values) {
  return props
    .map((prop, i) => {
      const value = values[i]

      return value !== undefined ? `${prop.name}={${value}}` : undefined
    })
    .filter((propText) => {
      return propText !== undefined
    })
    .join(PROP_DELIMITER)
}

module.exports = {
  generatePropAttributes,
}

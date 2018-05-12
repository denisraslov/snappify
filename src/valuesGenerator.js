function getTypeValuesRange(type, isRequired, enums) {
  let range;

  if (type === 'void' || type === 'undefined') {
    range = ['undefined'];
  }

  if (type === 'null') {
    range = ['null'];
  }

  if (type === 'string') {
    range = ['\'\'', '\'value\''];
  }

  if (type === 'number' || type === 'any') {
    range = [-10, 0, 10];
  }

  if (type === 'boolean') {
    range = [false, true];
  }

  if (type === 'object') {
    range = ['{}'];
  }

  if (type === 'React.ReactNode' || type === 'JSX.Element') {
    range = ['<div />'];
  }

  if (type === 'React.CSSProperties') {
    range = ['{}', '{ padding: 0 }'];
  }

  if (enums) {
    const typeEnum = enums.find(item => item.name === type);
    if (typeEnum) {
      range = typeEnum.items;
    }
  }

  if (type.includes('[]') || type.includes('Array')) {
    const itemType = type.includes('Array')
      ? type.substr(6, type.length - 7)
      : type.substr(0, type.length - 2);

    const itemTypeRange = getTypeValuesRange(itemType, true, enums);

    if (itemTypeRange) {
      range = [
        [],
        [itemTypeRange[0]]
      ];
    }
  }

  if (type.includes('=>')) {
    const returnType = type.split('=>').pop();
    const returnTypeRange = getTypeValuesRange(returnType, true, enums);

    if (returnTypeRange) {
      range = returnTypeRange.map(
        value => `() => ${value}`
      );
    }
  }

  if (range && !isRequired) {
    // undefined means an option when we won't add a prop to a component
    range.push(undefined);
  }

  return range;
}

// Get all the combinations of values for their defined ranges.
// Ranges could be like:
// [false, true]
// [-10, 0 ,10 ]
// ['', 'value']
function getValuesSetForRanges(ranges) {
  let valuesSets = [];

  for (let rangeIndex = 0; rangeIndex < ranges.length; rangeIndex++) {
    const values = ranges[rangeIndex];

    if (valuesSets.length === 0) {
      valuesSets.push(
        ...(values.map(value => [value]))
      );
    } else {
      const newValuesSets = [];

      for (let setIndex = 0; setIndex < valuesSets.length; setIndex++) {
        const valuesSet = valuesSets[setIndex];

        for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
          const value = values[valueIndex];
          const newValuesSet = valuesSet.concat([value]);

          newValuesSets.push(newValuesSet);
        }
      }

      valuesSets = newValuesSets;
    }
  }

  return valuesSets;
}

function getRangesForTypes(props, enums) {
  return props.map(prop => getTypeValuesRange(prop.type, prop.required, enums));
}

function getValuesSetForTypes(props, enums) {
  const ranges = getRangesForTypes(props, enums);

  return getValuesSetForRanges(ranges);
}

function getInvalidTypes(props, enums) {
  const ranges = getRangesForTypes(props, enums);

  return props.filter((prop, i) => {
    const range = ranges[i];
    return !range;
  });
}

module.exports = {
  getValuesSetForRanges,
  getValuesSetForTypes,
  getTypeValuesRange,
  getInvalidTypes
};

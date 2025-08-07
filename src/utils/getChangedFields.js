function deepCompare(original, current) {
  if (current instanceof File) {
    return !(original instanceof File) ||
      original.name !== current.name ||
      original.size !== current.size;
  }

  if (Array.isArray(original) && Array.isArray(current)) {
    if (original.length !== current.length) return true;

    const sortedOriginal = [...original].sort((a, b) => (a.id || '').localeCompare(b.id || ''));
    const sortedCurrent = [...current].sort((a, b) => (a.id || '').localeCompare(b.id || ''));

    for (let i = 0; i < sortedCurrent.length; i++) {
      if (deepCompare(sortedOriginal[i], sortedCurrent[i])) return true;
    }
    return false;
  }

  if (typeof original === "object" && typeof current === "object" && original && current) {
    const keys = new Set([...Object.keys(original), ...Object.keys(current)]);
    for (const key of keys) {
      if (deepCompare(original[key], current[key])) return true;
    }
    return false;
  }

  const bothEmpty = original == null && current === "";
  return original !== current && !bothEmpty;
}

function getChangedFields(originalData, newData) {
  const changedFields = {};

  for (const key in newData) {
    const originalValue = originalData[key];
    const currentValue = newData[key];

    const isArrayOfObjects = Array.isArray(currentValue) &&
      currentValue.every(item => typeof item === "object" && item !== null);

    const isArrayWithIdObjects = isArrayOfObjects &&
      currentValue.every(item => "id" in item);

    if (isArrayWithIdObjects && Array.isArray(originalValue)) {
      const modifiedItems = [];

      currentValue.forEach(itemActual => {
        const itemOriginal = originalValue.find(item => item.id === itemActual.id);
        if (!itemOriginal || deepCompare(itemOriginal, itemActual)) {
          modifiedItems.push(itemActual);
        }
      });

      if (modifiedItems.length > 0) {
        changedFields[key] = modifiedItems;
      }

    } else if (isArrayOfObjects && Array.isArray(originalValue)) {
      // caso: hay objetos sin ID (nuevas filas)
      const addedItems = currentValue.filter(item => !("id" in item));
      if (addedItems.length > 0) {
        changedFields[key] = addedItems;
      }

    } else if (deepCompare(originalValue, currentValue)) {
      changedFields[key] = currentValue;
    }
  }

  return changedFields;
}


export {getChangedFields}
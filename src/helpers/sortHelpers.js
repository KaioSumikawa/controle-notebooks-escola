export function sortBy(
  items = [],
  field,
  direction = 'asc'
) {
  if (!field) {
    return items;
  }


  return [...items].sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];


    if (
      valueA === null ||
      valueA === undefined
    ) {
      return 1;
    }


    if (
      valueB === null ||
      valueB === undefined
    ) {
      return -1;
    }


    let comparison = 0;


    if (
      typeof valueA === 'number' &&
      typeof valueB === 'number'
    ) {
      comparison = valueA - valueB;
    } 
    
    else if (
      isDate(valueA) &&
      isDate(valueB)
    ) {
      comparison =
        new Date(valueA) -
        new Date(valueB);
    } 
    
    else {
      comparison = String(valueA)
        .localeCompare(
          String(valueB),
          'pt-BR',
          {
            sensitivity: 'base',
          }
        );
    }


    return direction === 'desc'
      ? -comparison
      : comparison;
  });
}


export function toggleSortDirection(
  currentDirection
) {
  return currentDirection === 'asc'
    ? 'desc'
    : 'asc';
}


export function isDate(value) {
  if (!value) {
    return false;
  }


  const date = new Date(value);

  return !Number.isNaN(
    date.getTime()
  );
}


export function sortMultiple(
  items = [],
  sortConfig = []
) {
  return [...items].sort((a, b) => {

    for (const sort of sortConfig) {

      const comparison =
        compareValues(
          a[sort.field],
          b[sort.field]
        );


      if (comparison !== 0) {
        return sort.direction === 'desc'
          ? -comparison
          : comparison;
      }

    }


    return 0;
  });
}


function compareValues(
  valueA,
  valueB
) {
  if (valueA === valueB) {
    return 0;
  }


  if (
    valueA === null ||
    valueA === undefined
  ) {
    return 1;
  }


  if (
    valueB === null ||
    valueB === undefined
  ) {
    return -1;
  }


  if (
    typeof valueA === 'number' &&
    typeof valueB === 'number'
  ) {
    return valueA - valueB;
  }


  return String(valueA)
    .localeCompare(
      String(valueB),
      'pt-BR',
      {
        sensitivity: 'base',
      }
    );
}
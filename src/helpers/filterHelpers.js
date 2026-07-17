export function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}


export function searchFilter(
  items = [],
  search = '',
  fields = []
) {
  if (!search) {
    return items;
  }

  const normalizedSearch = normalizeText(search);


  return items.filter((item) =>
    fields.some((field) =>
      normalizeText(item[field])
        .includes(normalizedSearch)
    )
  );
}


export function statusFilter(
  items = [],
  status = '',
  field = 'status'
) {
  if (!status) {
    return items;
  }


  return items.filter(
    (item) =>
      item[field] === status
  );
}


export function dateFilter(
  items = [],
  startDate,
  endDate,
  field
) {
  return items.filter((item) => {

    const itemDate = new Date(
      item[field]
    );


    if (
      startDate &&
      itemDate < new Date(startDate)
    ) {
      return false;
    }


    if (
      endDate &&
      itemDate > new Date(endDate)
    ) {
      return false;
    }


    return true;
  });
}


export function filterData(
  items = [],
  {
    search,
    searchFields = [],
    status,
    statusField = 'status',
    startDate,
    endDate,
    dateField,
  } = {}
) {
  let filtered = [...items];


  if (search) {
    filtered = searchFilter(
      filtered,
      search,
      searchFields
    );
  }


  if (status) {
    filtered = statusFilter(
      filtered,
      status,
      statusField
    );
  }


  if (
    dateField &&
    (startDate || endDate)
  ) {
    filtered = dateFilter(
      filtered,
      startDate,
      endDate,
      dateField
    );
  }


  return filtered;
}
export const createColumnsFromData = (data: any) => {
  if (!data.length) {
    return [];
  }
  const keys = Object.keys(data[0]);
  return keys.map((key, index) => ({
    id: index + 1,
    title: key.charAt(0).toUpperCase() + key.slice(1),
  }));
};

export const createDataset = (data: any[], columns: any[]) => {
  return data.map((row) => {
    const id = columns.findIndex((el) => el.title.toLowerCase() === 'id');
    const cells = columns.map((col) => row[col.title.toLowerCase()]);
    return { id: cells[id] ? cells[id] : row.id, cells };
  });
};

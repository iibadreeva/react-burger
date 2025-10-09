export const splitToCols = (arr: number[], perCol = 10) => {
  const col1 = arr.slice(0, perCol);
  const col2 = arr.slice(perCol, perCol * 2);
  return [col1, col2] as const;
};

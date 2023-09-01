export function onChangeDate({ date }) {
  const getDate = `${date.$d.getDate()}-${
    date.$d.getMonth() + 1
  }-${date.$d.getFullYear()}`;

  return getDate;
}

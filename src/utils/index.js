export const addMoreDayToDate = (date, number) => {
  date.setDate(date.getDate() + number);

  return date;
};

export const formatDate= (inputDate: string | number | Date) => {               // format the date to display it in a readable manner
  if (!inputDate) {
    return 'Invalid Date';
  }

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };

  const date = inputDate instanceof Date ? inputDate : new Date(inputDate);

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  return formattedDate;
}

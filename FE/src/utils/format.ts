const currencyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 2,
});

export const formatCurrency = (value: number) =>
  currencyFormatter.format(value);

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export const formatDate = (value: string | number | Date) =>
  dateFormatter.format(new Date(value));

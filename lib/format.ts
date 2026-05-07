function normalizeDate(date: string): string {
  return /^\d{4}-\d{2}$/.test(date) ? `${date}-01` : date;
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric"
  }).format(new Date(`${normalizeDate(date)}T00:00:00`));
}

export function formatDateRange(startDate: string | undefined, endDate: string): string {
  if (!startDate || startDate === endDate) {
    return formatDate(endDate);
  }

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

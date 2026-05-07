export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

export function formatDateRange(startDate: string | undefined, endDate: string): string {
  if (!startDate || startDate === endDate) {
    return formatDate(endDate);
  }

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

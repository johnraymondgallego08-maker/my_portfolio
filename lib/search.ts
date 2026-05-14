export function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function matchesSearch(values: string[], query: string): boolean {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return true;
  }

  const normalizedValues = normalizeSearchText(values.join(" "));

  return (
    normalizedValues.includes(normalizedQuery) ||
    normalizedValues.replace(/\s/g, "").includes(normalizedQuery.replace(/\s/g, ""))
  );
}

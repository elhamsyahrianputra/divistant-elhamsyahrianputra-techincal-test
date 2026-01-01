/**
 * Build includes object for Prisma queries
 * @param includes - Comma-separated string of includes (e.g., 'book,user')
 * @param allowedIncludes - Array of allowed include relations
 * @returns Object with boolean values for each allowed include
 */
export function buildIncludes(
  includes?: string,
  allowedIncludes?: string[],
): Record<string, boolean> {
  if (!includes || !allowedIncludes) {
    return {};
  }

  return includes.split(',').reduce(
    (acc, key) => {
      const trimmedKey = key.trim();
      if (allowedIncludes.includes(trimmedKey)) {
        acc[trimmedKey] = true;
      }
      return acc;
    },
    {} as Record<string, boolean>,
  );
}

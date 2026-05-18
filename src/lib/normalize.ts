/**
 * Category Normalization Utility
 * Standardizes category slugs to ensure 100% data consistency.
 */
export function normalizeCategorySlug(slug: string | null | undefined): string {
  if (!slug) return 'uncategorized'
  const clean = slug.trim().toLowerCase()
  if (clean === 'uncategorized' || clean === 'null' || clean === 'undefined' || clean === '') {
    return 'uncategorized'
  }
  return clean
}

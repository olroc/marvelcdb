export function buildUrl({
  baseUrl,
  path,
  searchParams,
}: {
  baseUrl?: string
  path: string
  searchParams?: URLSearchParams
}): string {
  return `${baseUrl ?? ''}${path}${searchParams ? '?' : ''}${
    searchParams?.toString() ?? ''
  }`
}

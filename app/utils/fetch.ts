export const fetchData: <T>(url: string) => Promise<T> = async (
  url: string
) => {
  const response = await fetch(url)

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

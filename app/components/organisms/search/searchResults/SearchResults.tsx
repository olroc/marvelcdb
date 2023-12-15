type SearchResultsProps = {
  results: Card[]
}

export default function SearchResults({ results }: SearchResultsProps) {
  return results.map(card => <div key={card.name}>{card.name}</div>)
}

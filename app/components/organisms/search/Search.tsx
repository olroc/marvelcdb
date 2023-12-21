import AspectsList from './aspectsList/AspectsList'
import SearchField from './searchField/SearchField'
import SearchResults from './searchResults/SearchResults'

type SearchProps = {
  results: Card[]
}

export default async function Search({ results }: SearchProps) {
  return (
    <div className="flex flex-col justify-center">
      <div>
        <AspectsList />
        <SearchField />
      </div>

      <div className="text-white text-center">
        <SearchResults results={results} />
      </div>
    </div>
  )
}

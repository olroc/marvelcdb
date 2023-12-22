'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDebounce } from 'usehooks-ts'

import SearchLogo from './SearchLogo'

type SearchInputProps = {
  query: string | null
  onChange: (value: string) => void
}

export default function SearchInput({ query, onChange }: SearchInputProps) {
  const [value, setValue] = useState(query)
  const debouncedValue = useDebounce(value, 250)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => onChange(debouncedValue ?? ''), [onChange, debouncedValue])

  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <SearchLogo />
      </div>

      <input
        autoComplete="off"
        type="search"
        id="default-search"
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search through card names, traits and abilities"
        defaultValue={value ?? ''}
        onChange={handleChange}
      />
    </div>
  )
}

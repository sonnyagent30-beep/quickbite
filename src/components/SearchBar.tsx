'use client'

import { useState, useRef, useEffect } from 'react'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  suggestions?: string[]
  onSuggestionSelect?: (suggestion: string) => void
}

export const SearchBar = ({
  placeholder = 'Search restaurants or cuisines',
  onSearch,
  suggestions = [],
  onSuggestionSelect
}: SearchBarProps) => {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredSuggestions = suggestions.filter(s =>
    s.toLowerCase().includes(query.toLowerCase()) && query.length > 0
  )

  useEffect(() => {
    setShowSuggestions(isFocused && filteredSuggestions.length > 0)
  }, [isFocused, filteredSuggestions.length])

  const handleSearch = (value: string) => {
    setQuery(value)
    onSearch?.(value)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
    onSuggestionSelect?.(suggestion)
    inputRef.current?.blur()
  }

  const handleClear = () => {
    setQuery('')
    onSearch?.('')
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div 
        className={`relative flex items-center transition-all duration-200 ${
          isFocused ? 'ring-2 ring-[#E85D04]' : ''
        }`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#999999" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="absolute left-3 top-1/2 -translate-y-1/2"
        >
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 rounded-full bg-[#F5F5F5] text-sm outline-none transition-all"
        />

        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-[#E5E5E5] rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-[#E5E5E5] overflow-hidden z-50 animate-fade-in">
          <ul className="py-2">
            {filteredSuggestions.map((suggestion, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F5F5F5] transition-colors flex items-center gap-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.3-4.3"/>
                  </svg>
                  <span className="text-[#333333]">{suggestion}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchBar
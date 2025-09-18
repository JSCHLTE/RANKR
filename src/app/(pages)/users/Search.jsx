'use client'
import React, { useEffect, useState } from 'react'

import "./search.css"

const Search = ({ onSearch }) => {

    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        onSearch(searchValue);
    }, [searchValue])

  return (
    <input
    type="text"
    placeholder="Search users..."
    className="user-search"
    value={searchValue}
    onChange={({ target }) => setSearchValue(target.value)}
  />
  )
}

export default Search
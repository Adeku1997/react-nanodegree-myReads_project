import React, { Component } from 'react'

function SearchForm (props) {
  
    return (
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author"
          value={props.query}
          onChange={props.onUpdateQuery}
        />
      </div>
    )
  
}

export default SearchForm;
import React from  "react"
import '../styles/Search.css';

function SearchBar({setInputValue}) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      setInputValue(e.target.elements.query.value)
    }}>
      <div className="App">
        <div id="searchBlock">
          <input 
            type="text" 
            name="query" 
            placeholder="Начните вводить текст для поиска (не менее трех символов)" 
            id="searchBar"
          />
          <button 
            type="submit" 
            id="searchBtn">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchBar
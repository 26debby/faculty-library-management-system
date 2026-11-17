import { useState } from "react";

function SearchBar({ onSearch, loadBooks }) {
  const [searchType, setSearchType] = useState("name");
  const [keyword, setKeyword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchType, keyword);
  }

  function handleReset() {
    setKeyword("");
    loadBooks();
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>

        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="name">Book Name</option>
          <option value="category">Category</option>
          <option value="genre">Genre</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button type="submit" >Search</button>

        <button
          type="button"
          onClick={handleReset}
        >
          Show All
        </button>

      </form>
    </div>
  );
}

export default SearchBar;
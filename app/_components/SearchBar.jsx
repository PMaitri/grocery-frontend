import { useState, useEffect } from "react";
import GlobalApi from "../utils/GlobalApi"; // Your API call utility

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch search suggestions
  useEffect(() => {
    if (query.length > 1) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const fetchSuggestions = async (searchTerm) => {
    try {
      const response = await GlobalApi.get(`/products?filters[name][$contains]=${searchTerm}`);
      setSuggestions(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setQuery(item.attributes.name);
                setShowSuggestions(false);
                onSelect(item); // Handle product selection
              }}
            >
              {item.attributes.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

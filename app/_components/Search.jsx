"use client"; 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 

export function Search() {
  const [term, setTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (term) {
      const timeoutId = setTimeout(() => {
        // Construct query string manually
        const searchParams = new URLSearchParams({ query: term });
        router.push(`/search?${searchParams.toString()}`);
      }, 300); // Debouncing mechanism

      return () => clearTimeout(timeoutId);
    }
  }, [term]);

  const handleSearch = (e) => {
    setTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={term}
        onChange={handleSearch}
       
      />
    </div>
  );
}

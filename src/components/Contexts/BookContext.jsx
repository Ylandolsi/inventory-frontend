import { useState, createContext, useCallback, useEffect } from "react";

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [Books, setBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5159/api/books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <BookContext.Provider value={{ Books, refreshBooks: fetchBooks }}>
      {children}
    </BookContext.Provider>
  );
}

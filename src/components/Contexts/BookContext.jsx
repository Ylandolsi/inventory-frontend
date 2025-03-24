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

  const addBook = async (book, refreshAuthors, refreshGenres) => {
    try {
      const response = await fetch("http://localhost:5159/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      const data = await response.json();
      console.log("Book added:", data);
      fetchBooks();
      refreshAuthors();
      refreshGenres();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <BookContext.Provider value={{ Books, addBook, refreshBooks: fetchBooks }}>
      {children}
    </BookContext.Provider>
  );
}

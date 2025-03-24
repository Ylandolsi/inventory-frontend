import { useState, createContext, useCallback, useEffect } from "react";

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [Books, setBooks] = useState([]);
  const [allBooksCache, setAllBooksCache] = useState([]);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5159/api/books");
      const data = await response.json();
      setBooks(data);
      setAllBooksCache(data);
      return data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }, []);

  const fetchBooksSearch = useCallback(
    async (search) => {
      console.log(search);
      if (search == "") setBooks(allBooksCache);
      else {
        console.log("fetching");
        const response = await fetch(
          `http://localhost:5159/api/books/search?query=${search}`
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        setBooks(await response.json());
      }
      console.log(Books);
    },
    [allBooksCache]
  );

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
      await fetchBooks();
      await refreshAuthors();
      await refreshGenres();
    } catch (error) {
      console.error("Error adding book:", error);
      throw error;
    }
  };

  const editBook = async (book, refreshAuthors, refreshGenres) => {
    console.log("Editing book:");
    console.log(book);
    try {
      const response = await fetch(
        `http://localhost:5159/api/books/${book.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = {};
      const contentType = response.headers.get("content-type");
      if (
        contentType &&
        contentType.includes("application/json") &&
        response.status !== 204
      ) {
        data = await response.json();
      }
      console.log("Book edited:", data);
      await fetchBooks();
      await refreshAuthors();
      await refreshGenres();
      console.log("Refreshed all");
      return data;
    } catch (error) {
      console.error("Error editing book:", error);
      throw error;
    }
  };

  const deleteBook = async (id, refreshAuthors, refreshGenres) => {
    try {
      const response = await fetch(`http://localhost:5159/api/books/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await console.log("Book deleted:", id);
      await fetchBooks();
      await refreshAuthors();
      await refreshGenres();
    } catch (error) {
      console.error("Error deleting book:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <BookContext.Provider
      value={{
        Books,
        addBook,
        editBook,
        deleteBook,
        refreshBooks: fetchBooks,
        fetchBooksSearch,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

import { useState, createContext, useCallback, useEffect } from "react";

const API_BASE_URL = import.meta.env.PROD
  ? 'https://inventory-api-la8y.onrender.com/api'
  : 'http://localhost:5159/api';

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [Books, setBooks] = useState([]);
  const [allBooksCache, setAllBooksCache] = useState([]);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/books`);
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
          `${API_BASE_URL}/books/search?query=${search}`
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
      const response = await fetch(`${API_BASE_URL}/books`, {
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
    try {
      console.log("Editing book:");
      console.log(book);
      const payload = {
        Id: book.id,
        Title: book.title,
        Description: book.description || "No description available",
        Quantity: parseInt(book.quantity),
        AuthorId: parseInt(book.authorid),
        GenreId: parseInt(book.genreid),
      };
      console.log("Sending payload:", payload);
      
      const response = await fetch(
        `${API_BASE_URL}/books/${book.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      
      if (response.status === 204 || response.ok || response.redirected) {
        console.log("Book updated successfully");
        await fetchBooks();
        await refreshAuthors();
        await refreshGenres();
        return { success: true };
      }
      
      console.error(`Response status: ${response.status}, Status Text: ${response.statusText}`);
      const errorText = await response.text().catch(() => "Unable to get error details");
      console.error("Error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
    } catch (error) {
      console.error("Error editing book:", error);
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        console.error("Network error - check your connection and CORS configuration");
      }
      throw error;
    }
  };

  const deleteBook = async (id, refreshAuthors, refreshGenres) => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/${id}`, {
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

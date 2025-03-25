import React, { useCallback } from "react";
import { useState, useEffect, createContext } from "react";

const API_BASE_URL = import.meta.env.PROD
  ? 'https://inventory-api-la8y.onrender.com/api'
  : 'http://localhost:5159/api';

export const AuthorContext = createContext();

export const AuthorProvider = ({ children }) => {
  const [authors, setAuthors] = useState([]);

  const [allAuthorsCache, setAllAuthorsCache] = useState([]);



  // to avoid re render the function each time the component is rendered
  const fetchAuthors = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/authors`);
      const data = await response.json();
      setAuthors(data);
      setAllAuthorsCache(data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  }, []);

  const fetchAuthorsSearch = useCallback(
    async (search) => {
      console.log(search);
      if (search == "") setAuthors(allAuthorsCache);
      else {
        console.log("fetching");
        const response = await fetch(
          `${API_BASE_URL}/Authors/search?query=${search}`
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch Authors");
        }
        setAuthors(await response.json());
      }
      console.log(authors);
    },
    [allAuthorsCache]
  );

  const addAuthor = async (newAuthor, refreshBooks, refreshGenres) => {
    try {
      const response = await fetch(`${API_BASE_URL}/authors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAuthor),
      });

      if (response.ok) {
        await fetchAuthors();
        await refreshBooks();
        await refreshGenres();
      } else {
        console.error("Failed to create author");
      }
    } catch (error) {
      console.error("Error creating author:", error);
    }
  };
  const editAuthor = async (author, refreshBooks, refreshGenres) => {
    console.log("Editing Author:");
    console.log(author);
    try {
      const response = await fetch(
        `${API_BASE_URL}/authors/${author.Id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(author),
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
      console.log("Author edited:", data);
      await fetchAuthors();
      await refreshBooks();
      await refreshGenres();
      console.log("Refreshed all");
      return data;
    } catch (error) {
      console.error("Error editing book:", error);
      throw error;
    }
  };

  const deleteAuthor = async (id, refreshBooks, refreshGenres) => {
    try {
      const response = await fetch(`${API_BASE_URL}/authors/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchAuthors();
        await refreshBooks();
        await refreshGenres();
      } else {
        console.error("Failed to delete author");
      }
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  return (
    <AuthorContext.Provider
      value={{
        authors,
        addAuthor,
        deleteAuthor,
        editAuthor,
        fetchAuthorsSearch,
        refreshAuthors: fetchAuthors,
      }}
    >
      {children}
    </AuthorContext.Provider>
  );
};

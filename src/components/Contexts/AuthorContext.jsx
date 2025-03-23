import React, { useCallback } from "react";
import { useState, useEffect, createContext } from "react";

export const AuthorContext = createContext();

export const AuthorProvider = ({ children }) => {
  const [authors, setAuthors] = useState([]);

  // to avoid re render the function each time the component is rendered
  const fetchAuthors = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5159/api/authors");
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  }, []);
  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const addAuthor = async (newAuthor) => {
    try {
      const response = await fetch("http://localhost:5159/api/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAuthor),
      });

      if (response.ok) {
        const newAuthor = await response.json();
        setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
      } else {
        console.error("Failed to create author");
      }
    } catch (error) {
      console.error("Error creating author:", error);
    }
  };

  return (
    <AuthorContext.Provider
      value={{ authors, addAuthor, refreshAuthors: fetchAuthors }}
    >
      {children}
    </AuthorContext.Provider>
  );
};

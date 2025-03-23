import { createContext, useState, useEffect } from "react";

export const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("http://localhost:5159/api/genres");
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const addGenre = async (newGenre) => {
    try {
      const response = await fetch("http://localhost:5159/api/genres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGenre),
      });

      if (response.ok) {
        const newGenre = await response.json();
        setGenres((prevGenres) => [...prevGenres, newGenre]);
      } else {
        console.error("Failed to create genre");
      }
    } catch (error) {
      console.error("Error creating genre:", error);
    }
  };

  return (
    <GenreContext.Provider value={{ genres, addGenre }}>
      {children}
    </GenreContext.Provider>
  );
};

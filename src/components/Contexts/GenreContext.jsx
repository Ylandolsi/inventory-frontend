import { createContext, useState, useEffect, useCallback } from "react";

const API_BASE_URL = import.meta.env.PROD
  ? 'https://inventory-api-la8y.onrender.com/api'
  : 'http://localhost:5159/api';

export const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [allGenresCache, setAllGenresCache] = useState([]);

  const fetchGenres = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/genres`);
      const data = await response.json();
      setGenres(data);
      setAllGenresCache(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  }, []);

  const fetchGenresSearch = useCallback(
    async (search) => {
      console.log(search);
      if (search === "") setGenres(allGenresCache);
      else {
        console.log("fetching");
        const response = await fetch(
          `${API_BASE_URL}/Genres/search?query=${search}`
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch Genres");
        }
        setGenres(await response.json());
      }
      console.log(genres);
    },
    [allGenresCache, genres]
  );

  const addGenre = async (newGenre, refreshAuthors, refreshBooks) => {
    try {
      const response = await fetch(`${API_BASE_URL}/genres`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGenre),
      });

      if (response.ok) {
        console.log("Genre added:", response);
        await fetchGenres();
        await refreshAuthors();
        await refreshBooks();
      } else {
        console.error("Failed to create genre");
      }
    } catch (error) {
      console.error("Error creating genre:", error);
    }
  };

  const editGenre = async (genre, refreshAuthors, refreshBooks) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/genres/${genre.Id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(genre),
        }
      );

      if (response.ok) {
        console.log("Genre edited");
        await fetchGenres();
        await refreshAuthors();
        await refreshBooks();
      } else {
        console.error("Failed to edit genre");
      }
    } catch (error) {
      console.error("Error editing genre:", error);
      throw error;
    }
  };

  const deleteGenre = async (id, refreshAuthors, refreshBooks) => {
    try {
      const response = await fetch(`${API_BASE_URL}/genres/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        await fetchGenres();
        await refreshAuthors();
        await refreshBooks();
      } else {
        console.error("Failed to delete genre");
      }
    } catch (error) {
      console.error("Error deleting genre:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  return (
    <GenreContext.Provider
      value={{
        genres,
        addGenre,
        editGenre,
        deleteGenre,
        fetchGenresSearch,
        refreshGenres: fetchGenres,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
};

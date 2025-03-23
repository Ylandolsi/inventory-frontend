import { Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import "./Genres.scss";
import { GenreContext } from "@/components/Contexts/GenreContext";

export function Genres() {
  const { genres } = useContext(GenreContext);
  console.log("genres from context", genres);
  const [Genres, setGenres] = useState(genres);

  useEffect(() => {
    setGenres(genres);
  }, [genres]);
  console.log("Genres from usestate", Genres);

  const fetchGenresSearch = async (search) => {
    console.log(search);
    if (search == "") setGenres(genres);
    else {
      console.log("fetching");
      const response = await fetch(
        `http://localhost:5159/api/Genres/search?query=${search}`
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch Genres");
      }
      setGenres(await response.json());
    }
    console.log(Genres);
  };

  console.log(Genres);
  return (
    <div
      className="DisplayGenres"
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "1.4rem", fontWeight: "bold" }}>Genres</p>
        <div className="addNewGenre">
          <Plus size={25} />
          <p style={{ fontSize: "0.9rem" }}>Add New Genre</p>
        </div>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search Genres..."
          onChange={(e) => fetchGenresSearch(e.target.value)}
        />
      </div>
      <div className="Genres-table-container">
        <table className="Genres-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Genres</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Genres.map((Genre) => (
              <tr key={Genre.id}>
                <td>{Genre.name}</td>
                <td>{Genre.description}</td>
                <td>
                  {Genre.bookCount} book{Genre.bookCount > 1 ? "s" : ""}{" "}
                </td>
                <td>
                  <div className="flexActions">
                    <button className="view-btn">View</button>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

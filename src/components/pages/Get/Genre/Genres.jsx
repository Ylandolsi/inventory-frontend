import { Plus } from "lucide-react";
import React, { useContext } from "react";
import "./Genres.scss";
import { GenreContext } from "@/components/Contexts/GenreContext";
import { Link } from "react-router-dom";
import { AuthorContext } from "@/components/Contexts/AuthorContext";
import { BookContext } from "@/components/Contexts/BookContext";

export function Genres() {
  const { genres, fetchGenresSearch, deleteGenre } = useContext(GenreContext);
  const { refreshAuthors } = useContext(AuthorContext);
  const { refreshBooks } = useContext(BookContext);

  const handleDelete = async (id) => {
    console.log("Deleting genre with id:", id);
    await deleteGenre(id, refreshAuthors, refreshBooks);
  };
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
          <p style={{ fontSize: "0.9rem" }}>
            <Link to="add"> Add New Genre </Link>
          </p>
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
            {genres.map((Genre) => (
              <tr key={Genre.id}>
                <td>{Genre.name}</td>
                <td>{Genre.description}</td>
                <td>
                  {Genre.bookCount} book{Genre.bookCount > 1 ? "s" : ""}{" "}
                </td>
                <td>
                  <div className="flexActions">
                    <button className="edit-btn">
                      <Link to={`edit/${Genre.id}`}>Edit</Link>
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(Genre.id)}
                    >
                      Delete
                    </button>
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

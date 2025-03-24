import { Plus } from "lucide-react";
import React, { useContext } from "react";
import "./Authors.scss";
import { AuthorContext } from "@/components/Contexts/AuthorContext";
import { Link } from "react-router-dom";
import { BookContext } from "@/components/Contexts/BookContext";
import { GenreContext } from "@/components/Contexts/GenreContext";

export function Authors() {
  const { authors, fetchAuthorsSearch, deleteAuthor } =
    useContext(AuthorContext);
  const { refreshBooks } = useContext(BookContext);
  const { refreshGenres } = useContext(GenreContext);

  const handleDelete = async (id) => {
    console.log("Deleting author with id:", id);
    await deleteAuthor(id, refreshBooks, refreshGenres);
  };
  console.log(authors);

  return (
    <div
      className="DisplayAuthors"
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
        <p style={{ fontSize: "1.4rem", fontWeight: "bold" }}>Authors</p>
        <div className="addNewAuthor">
          <Plus size={25} />
          <p style={{ fontSize: "0.9rem" }}>
            {" "}
            <Link to="add"> Add New Author</Link>
          </p>
        </div>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search Authors..."
          onChange={(e) => fetchAuthorsSearch(e.target.value)}
        />
      </div>
      <div className="Authors-table-container">
        <table className="Authors-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Bio</th>
              <th>Authors</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((Author) => (
              <tr key={Author.id}>
                <td>{Author.name}</td>
                <td>{Author.bio}</td>
                <td>
                  {Author.bookCount} book{Author.bookCount > 1 ? "s" : ""}{" "}
                </td>
                <td>
                  <div className="flexActions">
                    <button className="edit-btn">
                      {" "}
                      <Link to={`edit/${Author.id}`}>Edit</Link>
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(Author.id)}
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

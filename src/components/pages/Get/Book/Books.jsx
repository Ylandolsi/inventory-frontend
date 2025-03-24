import { Book, Plus } from "lucide-react";
import React, { useContext } from "react";
import "./Books.scss";
import { Link } from "react-router-dom";
import { BookContext } from "@/components/Contexts/BookContext";
import { AuthorContext } from "@/components/Contexts/AuthorContext";
import { GenreContext } from "@/components/Contexts/GenreContext";

export function Books() {
  const { Books, deleteBook, fetchBooksSearch } = useContext(BookContext);
  const { refreshAuthors } = useContext(AuthorContext);
  const { refreshGenres } = useContext(GenreContext);

  if (Books === null) {
    return <div>Loading...</div>;
  }

  console.log(Books);
  const handleDelete = async (id) => {
    console.log("Deleting book with id:", id);
    await deleteBook(id, refreshAuthors, refreshGenres);
  };

  return (
    <div
      className="DisplayBooks"
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
        <p style={{ fontSize: "1.4rem", fontWeight: "bold" }}>Books</p>
        <div className="addNewBook">
          <Plus size={25} />
          <p style={{ fontSize: "0.9rem" }}>
            <Link to="add">Add New Book</Link>
          </p>
        </div>
      </div>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search books..."
          onChange={(e) => fetchBooksSearch(e.target.value)}
        />
      </div>
      <div className="books-table-container">
        <table className="books-table">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>QTE</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.quantity}</td>
                <td>
                  <div className="flexActions">
                    <button className="edit-btn">
                      {" "}
                      <Link to={`edit/${book.id}`}>Edit</Link>
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(book.id)}
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

import { Book, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import "./Books.scss";
import { Link } from "react-router-dom";
import { BookContext } from "@/components/Contexts/BookContext";

export function Books() {
  const { Books } = useContext(BookContext);
  const [books, setBooks] = useState(Books);

  useEffect(() => {
    setBooks(Books);
  }, [Books]);

  const fetchBooksSearch = async (search) => {
    console.log(search);
    if (search == "") setBooks(Books);
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
    console.log(books);
  };

  console.log(books);
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
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.quantity}</td>
                <td>
                  <div className="flexActions">
                    <button className="view-btn"> View</button>
                    <button className="edit-btn">
                      {" "}
                      <Link to={`edit/${book.id}`}>Edit</Link>
                    </button>
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

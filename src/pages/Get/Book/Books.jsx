import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./Books.scss";

export function Books() {
  const allBooks = useLoaderData();
  const [books, setBooks] = useState(allBooks);

  const fetchBooksSearch = async (search) => {
    console.log(search);
    if (search == "") setBooks(allBooks);
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
          <p style={{ fontSize: "0.9rem" }}>Add New Book</p>
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

export async function BooksLoader() {
  const books = await fetch("http://localhost:5159/api/books");
  if (!books.ok) {
    throw new Error("Failed to fetch books");
  }
  console.log(books);
  return await books.json();
}

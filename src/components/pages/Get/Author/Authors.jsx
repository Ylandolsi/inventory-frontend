import { Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import "./Authors.scss";
import { AuthorContext } from "@/components/Contexts/AuthorContext";
import { Link } from "react-router-dom";

export function Authors() {
  const { authors } = useContext(AuthorContext);
  const [Authors, setAuthors] = useState(authors);

  useEffect(() => {
    setAuthors(authors);
  }, [authors]);

  const fetchAuthorsSearch = async (search) => {
    console.log(search);
    if (search == "") setAuthors(authors);
    else {
      console.log("fetching");
      const response = await fetch(
        `http://localhost:5159/api/Authors/search?query=${search}`
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch Authors");
      }
      setAuthors(await response.json());
    }
    console.log(Authors);
  };

  console.log(Authors);
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
            {Authors.map((Author) => (
              <tr key={Author.id}>
                <td>{Author.name}</td>
                <td>{Author.bio}</td>
                <td>
                  {Author.bookCount} book{Author.bookCount > 1 ? "s" : ""}{" "}
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

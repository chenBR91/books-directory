import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BookContext from "./BookContext.js";
import Main from "./Main";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    uploadAllData();
  }, []);

  const uploadAllData = async () => {
    try {
      // const urlGetAllBooks = "http://localhost:8000/api/books/all-books";
      // const res = await Promise.fetch(urlGetAllBooks);
      // const answer = await res.json();
      // setBooks(answer);
      fetch('http://localhost:8000/api/books/all-books').then(data => data.json()).then(data => setBooks(data))
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    console.log("books", books);
  }, [books]);

  const bookValue = {
    allBooks: books,
    setBooks,
    appearData: ["Author", "Title", "Pages", "Country", "Year"]
  };

  return (
    <Router>
      <BookContext.Provider value={bookValue}>
        <div>
          <Main />
        </div>
      </BookContext.Provider>
    </Router>
  );
};

export default App;

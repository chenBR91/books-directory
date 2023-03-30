import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BookContext from "./BookContext.js";
import SortContext from "./SortContext.js"
import Main from "./Main";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [listOfBooks, setListOfBooks] = useState([])
  const [sortParameter, setSortParameter] = useState({
    year: true, 
    page: true,
    author: ""
  });

  useEffect(() => {
    uploadAllData();
    //setListOfBooks(books);
  }, []);

  const uploadAllData = async () => {
    try {
      //const urlGetAllBooks = "http://localhost:8000/api/books/all-books";
      //const res = await fetch(urlGetAllBooks);
      //const answer = await res.json();
      //setBooks(answer);
      fetch('http://localhost:8000/api/books/all-books').then(data => data.json()).then(data => setBooks(data))
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    console.log("books", books);
    setListOfBooks(books);
  }, [books]);

  const bookValue = {
    allBooks: books,
    setBooks,
    listOfBooks,
    setListOfBooks,
    appearData: ["Author", "Title", "Pages", "Country", "Year"],
  };

  const sortValueBooks = {
    sortParameter, 
    setSortParameter
  }

  return (
    <Router>
      <BookContext.Provider value={bookValue}>
        <SortContext.Provider value={sortValueBooks}>
        <div>
          <Main />
        </div>
        </SortContext.Provider>
      </BookContext.Provider>
    </Router>
  );
};

export default App;

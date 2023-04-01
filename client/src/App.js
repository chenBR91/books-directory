import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import BookContext from "./BookContext.js";
import SortContext from "./SortContext.js";
import LocationContext from "./LocationContext.js";
import Main from "./Main";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([]);

  const [location, setLocation] = useState({
    latitude: "50",
    longitude: "50",
  });

  const [listOfBooks, setListOfBooks] = useState([]);

  const [sortParameter, setSortParameter] = useState({
    year: true,
    page: true,
    author: "",
  });

  useEffect(() => {
    uploadAllData();
    navigatorLocation();
  }, []);


  // location of users 
  const navigatorLocation = () => {
    window.navigator.geolocation.getCurrentPosition((position)=>setLocation({
        latitude: position['coords'].latitude, 
        longitude: position['coords'].longitude
      }))
  }


  const uploadAllData = async () => {
    try {
      //const urlGetAllBooks = "http://localhost:8000/api/books/all-books";
      //const res = await fetch(urlGetAllBooks);
      //const answer = await res.json();
      //setBooks(answer);
      fetch("http://localhost:8000/api/books/all-books")
        .then((data) => data.json())
        .then((data) => setBooks(data));
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
    setSortParameter,
  };

  const locationValue = {
    location,
    setLocation,
  };

  return (
    <Router>
      <BookContext.Provider value={bookValue}>
        <SortContext.Provider value={sortValueBooks}>
          <LocationContext.Provider value={locationValue}>
            <div>
              <Main />
            </div>
          </LocationContext.Provider>
        </SortContext.Provider>
      </BookContext.Provider>
    </Router>
  );
};

export default App;

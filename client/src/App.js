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
    //debugger;
    //uploadAllDataBooks();
    navigatorLocation();
  }, []);


  // location of users 
  // Current location

  // const navigatorLocation = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {console.log('fs', position.coords.latitude)})
  // }

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
  };


  const successCallback = (position) => {
    setLocation({
      latitude: position['coords'].latitude, 
      longitude: position['coords'].longitude
    })
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };

  // const navigatorLocation = () => {
  //   window.navigator.geolocation.getCurrentPosition((position) => setLocation({
  //       latitude: position['coords'].latitude, 
  //       longitude: position['coords'].longitude
  //     }))
  // }

  const navigatorLocation = () => {
    window.navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options )
  }



  useEffect(()=>{
    console.log('latitude', location.latitude);
    console.log('longitude', location.longitude);
  },[location.latitude, location.longitude])


  const uploadAllDataBooks = async () => {
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

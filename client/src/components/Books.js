import React, { useEffect, useContext, useState } from "react";
import BookContext from ".././BookContext.js";
import SortContext from "../SortContext.js";
import Book from "./Book.js";
import "./Books.css";

//import { styled } from '@mui/material/styles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

const Books = () => {
  const { appearData, allBooks, setListOfBooks } =
    useContext(BookContext);
  const { sortParameter, setSortParameter } = useContext(SortContext);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log("sortParameter", sortParameter);
  }, [sortParameter]);

  const sortByParameter = (data) => {
    const param = data.toLowerCase();
    const arraySorting = [...allBooks];

    if (sortParameter[param] === true) {
      arraySorting.sort(
        (firstItem, lastItem) => firstItem[param] - lastItem[param]
      );
    } else {
      arraySorting.sort(
        (firstItem, lastItem) => lastItem[param] - firstItem[param]
      );
    }

    setSortParameter((existingValues) => ({
      ...existingValues,
      [param]: !sortParameter[param],
    }));
    //setBooks(arraySorting);
    setListOfBooks(arraySorting);
  };


  const handdleClickRenderData = () => {
    const filterData = allBooks.filter((book) => book['author'] === inputValue)
    if(filterData.length === 0) {  // filter array is empty
        setListOfBooks(allBooks)
    } else {
        setListOfBooks(filterData);
    }
  };

  const ButtonSort = (data) => {
    return (
      <button className="button-sort" onClick={() => sortByParameter(data)}>
        Sort
      </button>
    );
  };

  const InputFilter = (data) => {
    return (
        <>
      <input
        className="input-filter"
        name={data.toLowerCase()}
        onChange={(e) => setInputValue(e.target.value)}
      />
     <Button onClick={handdleClickRenderData}>Filter</Button>
     </>
    );
  };

  const TableCellList = appearData.map((data, index) => (
    <TableCell key={index} align="left">
      {data}
      {data === "Year" || data === "Pages" ? ButtonSort(data) : ""}
      {data === "Author" ? InputFilter(data) : ""}
    </TableCell>
  ));

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>{TableCellList}</TableRow>
          </TableHead>
          <TableBody>
            <Book />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Books;

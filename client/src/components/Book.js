import React, { useContext } from "react";
import BookContext from ".././BookContext.js";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function Book() {
  const { allBooks, listOfBooks } = useContext(BookContext);

  return (
    <>
      {listOfBooks.map((row, index) => (
        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell>{row.author}</TableCell>
          <TableCell>{row.title}</TableCell>
          <TableCell>{row.pages}</TableCell>
          <TableCell>{row.country}</TableCell>
          <TableCell>{row.year}</TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default Book;

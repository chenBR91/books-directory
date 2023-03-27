import React, { useContext } from "react";
import BookContext from ".././BookContext.js";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function Book() {
  const { allBooks } = useContext(BookContext);

  return (
    <>
      {allBooks.map((row, index) => (
        <TableRow key={index}>
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

import React, { useEffect, useContext } from "react";
import BookContext from ".././BookContext.js";
import Book from "./Book.js";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Books = () => {
  const { appearData } = useContext(BookContext);

  useEffect(() => {
    //console.log("appearData", appearData);
  }, []);

  const TableCellList = appearData.map((data, index) => (
    <TableCell key={index} align="left">{data}</TableCell>
  ));

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {TableCellList}
            </TableRow>
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

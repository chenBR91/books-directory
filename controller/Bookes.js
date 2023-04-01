import {
  getAllBooks,
  createManyBooks,
  getDetailBook,
  createNewBook,
  deleteBook,
  updateBook,
  getAllBooksSortByPages
} from "../services/Books.js";

export const getAllBooksController = async (req, res) => {
  try {
    const books = await getAllBooks();
    // console.log("books", books);
    res.status(200).send(books);
  } catch (err) {
    console.log("err");
    res.status(400).send({ message: err });
  }
};

export const createManyBoobsControoler = async (req, res) => {
  try {
    const listBooks = req.body;
    listBooks.map((book) => {
      createManyBooks(book);
    });
    res.status(200).send("create succefull");
  } catch (err) {
    console.log("err");
    res.status(500).send({ message: err });
  }
};

export const getDetailBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const detailBook = await getDetailBook(id);

    res.status(200).send(detailBook);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

const listMustParameterToCreateBook = ["author", "language", "pages", "title"];

export const createNewBookController = async (req, res) => {
  try {
    const keysObject = Object.keys(req.body);
    const isCorrectCompare = listMustParameterToCreateBook.every((item) => {
      return keysObject.includes(item);
    });

    if (!isCorrectCompare) {
      res.status(202).send({ message: "error paramer is not correct" });
    }

    const newBook = await createNewBook(req.body);
    res.status(200).send(newBook);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

export const deleteBookController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await deleteBook(id)
    
    res.status(200).send(deletedBook)

  } catch (err) {
    res.status(500).send({message: err})
  }
};


const bookAllowParameterUpdate = ["author", "pages"]

export const updateBookController = async (req, res) => {
  try {
    const {id} = req.params;
    const parametersUpdate = Object.keys(req.body)

    const isValidaionUpdate = parametersUpdate.every((currentUpdate) => {
      return bookAllowParameterUpdate.includes(currentUpdate)
    });

    console.log('isValidaionUpdate', isValidaionUpdate);
    if(!isValidaionUpdate) {
      res.status(500).send({message: "Invalid update"})
    }

    const book = await getDetailBook(id);

    if(!book) {
      res.status(500).send({message: "book is not found"})
    }

    parametersUpdate.forEach((update) => {book[0][update] = req.body[update]})
    const updatedBook = await updateBook(book)
    
    res.status(200).send(updatedBook)

  } catch(err) {
    res.status(400).send({message: err})
  }
}


export const getAllBooksSortByPagesController = async (req, res) => {
  try {
    const sortStyle = {pages: 1}
    const booksSort = await getAllBooksSortByPages(sortStyle)

    res.status(200).send(booksSort)

  } catch (err) {
    res.status(500).send({message: err})
  }
}
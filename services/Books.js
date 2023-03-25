import { BooksModel } from "../models/Books.js";

export const getAllBooks = () => {
    return BooksModel.find({})
}

export const getDetailBook = (id) => {
    return BooksModel.find({_id: id})
}

export const createManyBooks = (book) => {
    const createBooks = new BooksModel(book)
    createBooks.save()
}

export const createNewBook = (obj) => {
    const createBook = new BooksModel(obj)
    createBook.save()
    return createBook
}


export const deleteBook = (id) => {
    const deleteBook = BooksModel.findByIdAndDelete({_id: id})
    return deleteBook
}


export const updateBook = (book) => {
    return book[0].save()
}

export const getAllBooksSortByPages = (bySort) => {
    return BooksModel.find({}).sort(bySort)
}
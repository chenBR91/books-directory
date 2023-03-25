import mongoose from "mongoose";

const BooksSchema = new mongoose.Schema({
    author: {
        type: String,
        require: true,
        default: "author"
    },
    country: {
        type: String,
        require: false,
        default: ""
    },
    imageLink: {
        type: String,
        require: true,
        default: "images/the-mahab-harata.jpg"
    },
    language: {
        type: String,
        require: true,
        default: "English"
    },
    link: {
        type: String,
        require: true,
        default: "http://ambrsoft.net"
    },
    pages: {
        type: Number,
        require: true,
        default: 1
    },
    title: {
        type: String,
        require: true,
        default: "null"
    },
    year: {
        type: String,
        require: true,
        default: "1970"
    }
})

export const BooksModel = mongoose.model("Books", BooksSchema);
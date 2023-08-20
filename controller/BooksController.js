const Books = require('../model/BooksModel');
const asyncHandler = require('express-async-handler');
const login = require('../controller/UserController');

// book list
// single books: id, author, title
// edit info
// delete
// create'

    const addBooks = asyncHandler(async (req, res) => {
        if(req.isAuthenticated()) {
        const {author, title, edition, pages, year, genre, purchased, price} = req.body;
        if  (!author || !title || !purchased || !price || !year) {
            throw new Error ('Please fill the required forms');
        };
        const createBook = await Books.create({
            title: title,
            author: author,
            edition: edition,
            pages: pages,
            year: year,
            genre: genre,
            purchased: purchased,
            price: price
        });
        res.status(200).json({message: 'successfully added'});
    }});
    
    const getAllBooks = asyncHandler( async (req, res) =>{
        const allBooks = await Books.find();
        res.status(200).json(allBooks);
    });
    
    const getBookById = asyncHandler( async (req, res) => {
        const IdBook = await Books.findOne({_id: req.params.id});
        res.status(200).send(IdBook)
    });
    
    const getBookByAuthor = (req, res) => {
        res.status(200).json({message: 'Book by Author'});
    }
    const getBookByTitle = (req, res) => {
        res.status(200).json({message: 'Book by Title'});
    }
    
    const updateBooks = (req, res) => {
        res.status(200).json({message: 'Book updated successfully'});
    }
    
    const deleteBooks = (req, res) => {
        res.status(200).json({message: 'Book deleted successfully'});
    }

    module.exports = {getAllBooks, addBooks, deleteBooks, updateBooks, getBookByAuthor, getBookById, getBookByTitle };

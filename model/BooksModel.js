const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a title"]
    },
    author: {
        type: String,
        required: [true, "Please add a author name"]
    },
    edition: {
        type: String,
        required: false
    },
    year: {
        type: String,
        required: [true, "Please add a published year"]
    },
    pages: {
        type: String,
        required: false
    },
    genre: {
        type: String,
    },
    purchased: {
        type: Date,
        required:[true, "Please add the date your purchased the date"]
    },
    price: {
        type: String,
        required: [true, "Please add the price of the book"]
    }
});

module.exports = mongoose.model("Books", BookSchema);
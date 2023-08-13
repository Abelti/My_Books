const express = require('express');
const app = express();
const env = require('dotenv').config();
const DBConnection = require('./DBConnection');

const user = require ('./routes/UserRoute');
const books = require('./routes/BooksRoute');

const PORT = process.env.PORT || 5000;

DBConnection();

app.use(express.json());
app.use('/api/books', books);
app.use('/api/users', user);


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
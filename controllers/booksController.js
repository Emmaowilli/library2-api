const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const booksCollection = mongoose.connection.collection('books');

exports. createBook = async (req, res) => {
    try {
        const bookId = new mongoose.Types.ObjectId(req.params.bookId);
        const result = await booksCollection.insertOne(req.body);
         res.status(201).json({
          id: result.insertedId,
          message: 'Book created successfully'
         });
        } catch (error) {
          res.status(500).json({message: error.message});
        }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await booksCollection.find({}).toArray();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports. getBookById = async (req, res) => {
    try {
        const bookId = new ObjectId(req.params.id);
        const book = await booksCollection.findOne({ _id: bookId });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports. updateBook = async (req, res) => {
    try {
        const bookId = new ObjectId(req.params.id);
        const result = await booksCollection.updateOne(
            {_id: bookId},
            {$set: req.body}
        );

        if (result.matchedCount ===0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({message:'Book updated successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports. deleteBook = async (req, res) => {
    try {
        const bookId = new mongoose.Types.ObjectId(req.params.id);
        const result = await booksCollection.deleteOne({ _id: bookId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
       
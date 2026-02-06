const mongoose = require('mongoose');
const  ObjectId  = mongoose.Types.ObjectId;
const authorsCollection =mongoose.connection.collection('authors');

exports. getAllAuthors = async (req, res) => {
  try {
    const authors = await authorsCollection.find({}).toArray();
    res.status(200).json(authors);
    } catch (err) {
      res.status(500).json({message: error.message});
    }
};

exports. getAuthorById = async (req, res) => {
  try {
    const authorId = new ObjectId(req.params.id);
    const author = await authorsCollection.findOne({ _id: authorId });
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.status(200).json(author);
   } catch (err) {
    res.status(500).json({message: err.message});
   }
};

exports. createAuthor = async (req, res) => {
  try {
    const authorId = new mongoose.Types.ObjectId(req.params.id);
    const result = await authorsCollection.insertOne(req.body);
     res.status(201).json({
      id: result.insertedId,
      message: 'Author created successfully'
     });
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  };

exports. updateAuthor = async (req, res) => {
  try {
    const authorId = new ObjectId(req.params.id);
    const result = await authorsCollection.updateOne(
      {_id: authorId},
      {$set: req.body}
    );
    if (result.matchedCount ===0) {
        return res.status(404).json({ message: 'Author not found.' });
    }
    res.status(200).json({message: 'Author updated successfully'});
 }catch (err) {
    res.status(500).json({message: error.message});
  }
};
exports. deleteAuthor = async (req, res) => {
  try {
    const authorId = new mongoose.Types.ObjectId(req.params.id);
    const result = await authorsCollection.deleteOne({ _id: authorId });
    if (result.deletedCount === 0) {
      return res.status(404).json({message: 'Author not found'});
    }

    res.sendStatus(204);
   } catch (error) {
    res.status(500).json({message: error.message});
    }
};

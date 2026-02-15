const Publisher = require('../models/Publisher');
exports.getAllPublishers = async (requestAnimationFrame, res) => {
    try {
        const publishers = await Publisher.find();
        res.status(200).json(publishers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPublisher = async (req, res) => {
    try {
        const publisher = new Publisher(req.body);
        await publisher.save();
        res.status(201).json(publisher);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.getPublisherById = async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    if (!publisher) {
      return res.status(404).json({ message: 'Publisher not found' });
    }
    res.status(200).json(publisher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePublisher = async (req, res) => {
  try {
    const publisher = await Publisher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!publisher) {
      return res.status(404).json({ message: 'Publisher not found' });
    }
    res.status(200).json(publisher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePublisher = async (req, res) => {
  try {
    const publisher = await Publisher.findByIdAndDelete(req.params.id);
    if (!publisher) {
      return res.status(404).json({ message: 'Publisher not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
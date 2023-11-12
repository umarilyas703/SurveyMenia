//Create mongoose schema for category
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minLength: 1
    },
    _languageId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;


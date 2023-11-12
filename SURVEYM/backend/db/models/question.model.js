//Create mongoose schema for question
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minLength: 1 
    },
    _categoryId:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    _domainId:{
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;


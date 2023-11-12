//Create mongoose schema for language
const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minLength: 1
    },
    sagree: {
        type: String,
        trim: true,
        minLength: 1
    },agree: {
        type: String,
        trim: true,
        minLength: 1
    },neutral: {
        type: String,
        trim: true,
        minLength: 1
    },dagree: {
        type: String,
        trim: true,
        minLength: 1
    },sdagree: {
        type: String,
        trim: true,
        minLength: 1
    }
});

const Language = mongoose.model('Language', LanguageSchema);

module.exports = Language;


const mongoose = require('mongoose');

const keywordMappingSchema = mongoose.Schema({
    Instruments: [String],
    Genres: [String]
});

module.exports = mongoose.model('KeywordMapping', keywordMappingSchema)
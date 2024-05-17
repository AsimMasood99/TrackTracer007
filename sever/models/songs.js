const mongoose = require('mongoose');
const schema = mongoose.Schema;

const songSchema = new schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: schema.Types.ObjectId,
        required: true
    }
})
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const artist = require('./song')

const albumSchema = new schema({
    title: {
        type:String,
        required: true
    },
    release_date: {
        type:Date,
        required: true
    },
    songs:
        [{type:schema.Types.ObjectId, 
        ref: 'song',
        required: true
    }]
        
})
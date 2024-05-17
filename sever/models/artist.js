const mongoose = require('mongoose');
const schema = mongoose.Schema;
const user = require('./user')

const artistSchema = new schema({
    artistName: {
        type: String,
        required: true
    },
    country:{
        type:String,
        required:true
    },
    genre:{
        type: String,
        required: true
    },
    about:{
        type: String,
        required: ture
    },
    joinDate:{
        type:Date,
        required:true
    },
    follower:
        [{type: schema.Types.ObjectId,
        ref: 'user',
        required: false
    }],
    album:
        [{type: schema.Types.ObjectId,
            ref: 'album',
            required: false
    }]
    

});

const artist = mongoose.model('artist', artistSchema);
module.exports = artist;
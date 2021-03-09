const { Schema, model } = require('mongoose');

const dietSchema = new Schema({

    typeDiet: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    imageURL: {
        type: String,
        required: true,
    },

    list: [{
        type: String,
        required: true,
    }   
    ]
})

module.exports = model('diet', dietSchema);
const mongoose = require("mongoose")


const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    category: {
        type: [],
        required: true,
    },

    image: {
        type: String
    },

    type: {
        type: String,
        required: true,
        enum: ["movie", "serie"]
    }

})


module.exports = mongoose.model("Movie", movieSchema)
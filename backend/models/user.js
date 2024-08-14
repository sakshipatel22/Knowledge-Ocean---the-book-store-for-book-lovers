const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    avtar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role: {
        type: String,
        default: "user",
        enum: ["user","admin"],
    },
    favourites: [{type: mongoose.Types.ObjectId ,
        ref: "books"
    }],
    cart: [{type: mongoose.Types.ObjectId ,
        ref: "books"
    }],
    orders: [{type: mongoose.Types.ObjectId ,
        ref: "order"
    }],
}, {timestamps: true});

module.exports = mongoose.model("user",user);
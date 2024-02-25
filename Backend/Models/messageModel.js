const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messagesSchema = new Schema(
    {   
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        reciver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        message: {
            type: String,
            require: true
        }
    },
    {timestamps: true}

);

module.exports = mongoose.model('Messages', messagesSchema);
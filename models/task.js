const { Schema, model } = require("mongoose");

const Task = new Schema({
    taskName: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = model("Task", Task)
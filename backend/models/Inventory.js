const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    ingredient: {
        type: String,
        required: true
    },
    qty: {
        type: String,
        required: true
    }
})

const Inventory = mongoose.model("Inventory",inventorySchema);

module.exports = Inventory;
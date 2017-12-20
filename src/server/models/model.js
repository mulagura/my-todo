const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelSchema = new Schema({
    itemName:String,
    itemDone:Boolean
});


module.exports = mongoose.model('modelName',ModelSchema,'activity');

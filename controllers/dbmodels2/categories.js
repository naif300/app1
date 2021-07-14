//Users-model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategoriesSchema = new Schema([{
 catname: { type: String, required:true},
 parent:  { type: String},
 catslug: { type: String}
}]);

var catSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

module.exports = mongoose.model('Category', catSchema)
//Export model
// module.exports = mongoose.model('categories', CategoriesSchema);

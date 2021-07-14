//Users-model
 
var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;
 

var ArticlesSchema = new Schema({

    title: String,
    short_disc: String,
    full_text: String,
    image : String
    //author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    //cat_id: { type: Schema.Types.ObjectId,ref:'categories',required:true},
    //article_date: Date.Now
});

 
//Export model
module.exports = mongoose.model('articles', ArticlesSchema);
 

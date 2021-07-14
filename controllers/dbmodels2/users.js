//Users-model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    first_name: { type: string, required:true},
    last_name: { type: string, required:true},
    email:  { type: string, unique:true, required:true, index: true},
    email_verified :{type: Boolean, default:false},
    email_verify_token:{type: string},
    phone: { type: string},
    phone_verified : {type: Boolean, default:false},
    phone_otp_number: {type:Number},
    phone_otp_expired_at: { type: Date},
    avatar: { type: string},
    password: { type: string, required:true},
    password_reset_token:{type: string},
    reset_token_expired_at: { type: Date},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },

    role: { type: String, enum: ['admin', 'writer', 'proofreader', 'editor', 'user'], default: 'user' },
    permission: {
            read: { type: Boolean, default: true, required: true  },
            write: { type: Boolean, default: false, required: true },
            delete: { type: Boolean, default: false, required: true },
            review: { type: Boolean, default: false, required: true },
            proofreading: { type: Boolean, default: false, required: true },
            publish: {type: Boolean, default: false, required: true}
        }
});


//Export model
module.exports = mongoose.model('users', UsersSchema);

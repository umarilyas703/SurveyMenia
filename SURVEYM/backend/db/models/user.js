//Create mongoose schema for user
const mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    fname: {
        type:String
    },

    lname: {
        type:String
    },

    email: {
        type: String, 
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    //saltSecret: String
});

UserSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password, 10);
}

UserSchema.methods.isValid = function(hashedpassword){
    return bcrypt.compareSync(hashedpassword, this.password);
}

const User = mongoose.model('User', UserSchema);

/*module.exports.getUserbyId = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserbyUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, () => {
        bcrypt.hash(newuser.password, salt, (err, hash) => {
            if(err){
                throw err;
            }
            newUser.password = hash;
            newUser.save(callback);
        })
    });
}*/


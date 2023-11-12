//Create mongoose schema for user

//Reference:
//MEAN Stack Front To Back
//Author: "Traversy Media"

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
        type: String               
    },

    username: {
        type: String            
    },

    password: {
        type: String               
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'ADMIN'    
    },

    username: {
        type: String        
    },

    password: {
        type: String      
    }    
});


const User = mongoose.model('User', UserSchema);
module.exports = User;

//get user by Id
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

//get user by username
module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

//add user
module.exports.addUser = function(newUser, callback){
    //hash password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
            if(err){
                throw err;
            }
            newUser.password = hash;
            newUser.save(callback)
        });
    });
}

//compare password to hash
module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
        if(err){
            throw err;
        }
        callback(null, isMatch);
    });
}




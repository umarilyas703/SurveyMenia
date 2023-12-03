const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://umarilyas703:<Bareer>@0315@cluster0.7dyxvil.mongodb.net/'
, { useNewUrlParser: true, useUnifiedTopology:true })
    .then(()=>console.log("Database has been connected")) 
    .catch((err)=>console.log(err));


module.exports = {
    mongoose,
    secret:'yoursecret'
}

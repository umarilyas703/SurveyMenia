const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://SurveyMenia:Survey123@cluster0.ccjawzg.mongodb.net/'
, { useNewUrlParser: true, useUnifiedTopology:true })
    .then(()=>console.log("Database has been connected")) 
    .catch((err)=>console.log(err));


module.exports = {
    mongoose,
    secret:'yoursecret'
}

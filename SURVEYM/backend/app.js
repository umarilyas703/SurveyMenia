const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require ('./db/mongoose');


const passport = require('passport');
const jwt = require("jsonwebtoken");

const Category = require ('./db/models/category.model.');
const Customer = require ('./db/models/customer.model');
const Question = require ('./db/models/question.model');
const Domain   = require ('./db/models/domain.model');
const Language = require ('./db/models/language.model');
const Response = require('./db/models/response.model');
const User     = require('./db/models/user.model');
app.use(express.json());

//cors middleware
const cors = require('cors');
app.use(cors());

//body parser middleware
const bodyParser = require('body-parser');

app.use(session({ 
    resave: false,
    saveUninitialized: true,
    secret: 'Centrims'  
}));
app.use(passport.initialize());
app.use(passport.session()); 

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

/*****************************************Category Endpoints*****************************************/

app.get('/category', (req, res)=> {
    Category.find({})
        .then(category => res.send(category))
        .catch((err) => console.log(err));
})

app.get('/category/:categoryId', (req, res) => {
    Category.findOne({_id: req.params.categoryId})
        .then(category => res.send(category))
        .catch((err) => console.log(err));
})

app.get('/:languageId/category', (req, res)=> {
    Category.find({_languageId: req.params.languageId})
        .then(category => res.send(category))
        .catch((err) => console.log(err));
})

app.post('/:languageId/category', (req, res) => {
    (new Category({'title': req.body.title, '_languageId': req.params.languageId}))
        .save()
        .then((category) => res.send(category))
        .catch((err) => console.log(err));
})

app.patch('/category/:categoryId', (req, res) => {
    Category.findOneAndUpdate({'_id': req.params.categoryId}, { $set: req.body })
        .then(category => res.send(category))
        .catch((err) => console.log(err));
})

app.delete('/category/:categoryId', (req, res) => {
    const deleteCategory = (category) => {
        Domain.deleteMany({_categoryId: category._id})
            .then(() => category)
            .catch((err) => console.log(err));
        Question.deleteMany({_categoryId: category._id})
            .then(()=> category)
            .catch((err)=> console.log(err));
    }
    const category = Category.findByIdAndDelete(req.params.categoryId)
        .then((category) => deleteCategory(category))
        .catch((err) => console.log(err));
    res.send(category);
})

/*****************************************Question Endpoints*****************************************/

app.get('/category/:categoryId/questions', (req, res)=> {
    Question.find({_categoryId: req.params.categoryId})
        .then(question => res.send(question))
        .catch((err) => console.log(err));
})

app.get('/questions/:questionId', (req, res) => {
    Question.findOne({_id: req.params.questionId})
        .then(question => res.send(question))
        .catch((err) => console.log(err));
})

app.get('/domains/:domainId/questions', (req, res)=> {
    Question.find({_domainId: req.params.domainId})
        .then(question => res.send(question))
        .catch((err) => console.log(err));
})

app.post('/category/:categoryId/domains/:domainId/questions', (req, res) => {
    (new Question({'title': req.body.title, '_categoryId': req.params.categoryId, '_domainId': req.params.domainId}))
        .save()
        .then((question) => res.send(question))
        .catch((err) => console.log(err));
})

app.patch('/questions/:questionId', (req, res) => {
    Question.findOneAndUpdate({'_id': req.params.questionId}, { $set: req.body })
        .then(question => res.send(question))
        .catch((err) => console.log(err));
})

app.delete('/questions/:questionId', (req, res) => {
    Question.findByIdAndDelete(req.params.questionId)
        .then(question => res.send(question))
        .catch((err) => console.log(err));
})

/*****************************************Domain Endpoints*****************************************/

app.get('/category/:categoryId/domains', (req, res)=> {
    Domain.find({_categoryId: req.params.categoryId})
        .then(domain => res.send(domain))
        .catch((err) => console.log(err));
})

app.get('/domains/:domainId', (req, res) => {
    Domain.findOne({_id: req.params.domainId})
        .then(domain => res.send(domain))
        .catch((err) => console.log(err));
})

app.post('/category/:categoryId/domains', (req, res) => {
    (new Domain({'title': req.body.title, '_categoryId': req.params.categoryId}))
        .save()
        .then((domain) => res.send(domain))
        .catch((err) => console.log(err));
})

app.patch('/domains/:domainId', (req, res) => {
    Domain.findOneAndUpdate({'_id': req.params.domainId}, { $set: req.body })
        .then(domain => res.send(domain))
        .catch((err) => console.log(err));
})

app.delete('/domains/:domainId', (req, res) => {
    const deleteDomain = (domain) => {
        Question.deleteMany({_domainId: domain._id})
            .then(() => domain)
            .catch((err) => console.log(err));
    }
    const domain = Domain.findByIdAndDelete(req.params.domainId)
        .then((domain) => deleteDomain(domain))
        .catch((err) => console.log(err));
    res.send(domain);
})


/*****************************************Language Endpoints*****************************************/

app.get('/language', (req, res)=> {
    Language.find({_languageId: req.params.languageId})
        .then(language => res.send(language))
        .catch((err) => console.log(err));
})

app.get('/language/:languageId', (req, res) => {
    Language.findOne({_id: req.params.languageId})
        .then(language => res.send(language))
        .catch((err) => console.log(err));
})

app.post('/language', (req, res) => {
    (new Language({'title': req.body.title, 
                    'sagree': req.body.sagree, 
                    'agree': req.body.agree, 
                    'neutral': req.body.neutral, 
                    'dagree': req.body.dagree, 
                    'sdagree': req.body.sdagree}))
        .save()
        .then((language) => res.send(language))
        .catch((err) => console.log(err));
})

app.patch('/language/:languageId', (req, res) => {
    Language.findOneAndUpdate({'_id': req.params.languageId}, { $set: req.body })
        .then(language => res.send(language))
        .catch((err) => console.log(err));
})

/*****************************************User Endpoints*****************************************/

app.get('/users', (req, res)=> {
    User.find({_userId: req.params.userId})
        .then(user => res.send(user))
        .catch((err) => console.log(err));
})

app.get('/users/:userId', (req, res) => {
    User.findOne({_id: req.params.userId})
        .then(user => res.send(user))
        .catch((err) => console.log(err));
})

app.post('/users', (req, res) => {
    (new User({'title': req.body.title}))
        .save()
        .then((user) => res.send(user))
        .catch((err) => console.log(err));
})

app.patch('/users/:userId', (req, res) => {
    User.findOneAndUpdate({'_id': req.params.userId}, { $set: req.body })
        .then(user => res.send(user))
        .catch((err) => console.log(err));
})

app.delete('/users/:userId', (req, res) => {
    User.findByIdAndDelete(req.params.userId)
        .then(user => res.send(user))
        .catch((err) => console.log(err));
})

require('./passport-config')(passport);

/*****************************************Register User*****************************************/

app.post('/register', (req, res, next) => {
    let newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success: false, msg:'Failed to register user'});
        } else {
            res.json({success: true, msg:'User registered'});
        }

    });
});


/*****************************************Authenticate User*****************************************/

app.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err){
            throw err;
        }
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) =>{
            if(err){
                throw err;
            }
            if(isMatch){
                const token = jwt.sign(user.toJSON(), mongoose.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user:{
                        id:user._id,
                        fname: user.fname,
                        lname: user.lname,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }
                });
            } else{
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

/*****************************************Protect Profile*****************************************/

app.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});


/*****************************************Customer Endpoints*****************************************/

app.get('/customer', (req, res)=> {
    Customer.find({})
        .then(customer => res.send(customer))
        .catch((err) => console.log(err));
})

app.get('/customer/:customerId', (req, res) => {
    Customer.findOne({_id: req.params.customerId})
        .then(customer => res.send(customer))
        .catch((err) => console.log(err));
})

app.post('/customer', (req, res) => {
    (new Customer({'title': req.body.title, 'clientId': req.body.clientId}))
        .save()
        .then((customer) => res.send(customer))
        .catch((err) => console.log(err));
})

app.patch('/customer/:customerId', (req, res) => {
    Customer.findOneAndUpdate({'_id': req.params.customerId}, { $set: req.body })
        .then(customer => res.send(customer))
        .catch((err) => console.log(err));
})


/*****************************************Response Endpoints*****************************************/

app.get('/response', (req, res)=> {
    Response.find({})
        .then(customer => res.send(customer))
        .catch((err) => console.log(err));
})

app.get('/response/:responseId', (req, res) => {
    Response.findOne({_id: req.params.customerId})
        .then(customer => res.send(customer))
        .catch((err) => console.log(err));
})

app.get('/response/:customerId/responses', (req, res)=> {
    Response.find({_customerId: req.params.customerId})
        .then(response => res.send(response))
        .catch((err) => console.log(err));
})

app.post('/add-response/:customerId', (req, res) => {
    (new Response({
        "customerName": req.body.customerName,
        "clientId": req.body.clientId,
        _customerId: req.params.customerId,
        'categoryName': req.body.categoryName,
        '_categoryId': req.body._categoryId,
        'domainName': req.body.domainName,
        '_domainId': req.body._domainId,
        'question': req.body.question,
        'response': req.body.response,
        'date': req.body.date}))
        .save()
        .then((customer) => res.send(customer))
        .catch((err) => console.log(err));
})

app.post('/language', (req, res) => {
    (new Language({'title': req.body.title, 
                    'sagree': req.body.sagree, 
                    'agree': req.body.agree, 
                    'neutral': req.body.neutral, 
                    'dagree': req.body.dagree, 
                    'sdagree': req.body.sdagree}))
        .save()
        .then((language) => res.send(language))
        .catch((err) => console.log(err));
})

app.patch('/language/:languageId', (req, res) => {
    Language.findOneAndUpdate({'_id': req.params.languageId}, { $set: req.body })
        .then(language => res.send(language))
        .catch((err) => console.log(err));
})

/*****************************************User Endpoints*****************************************/

//Reference:
//MEAN Stack Front To Back
//Author: "Traversy Media"

app.get('/users', (req, res)=> {
    User.find({_userId: req.params.userId})
        .then(user => res.send(user))
        .catch((err) => console.log(err));
})

app.get('/users/:userId', (req, res) => {
    User.findOne({_id: req.params.userId})
        .then(user => res.send(user))
        .catch((err) => console.log(err));
})

app.post('/users', (req, res) => {
    (new User({'title': req.body.title}))
        .save()
        .then((user) => res.send(user))
        .catch((err) => console.log(err));
})

app.patch('/users/:userId', (req, res) => {
    User.findOneAndUpdate({'_id': req.params.userId}, { $set: req.body })
        .then(user => res.send(user))
        .catch((err) => console.log(err));
})

require('./passport-config')(passport);

/*****************************************Register User*****************************************/

//Reference:
//MEAN Stack Front To Back
//Author: "Traversy Media"

app.post('/register', (req, res, next) => {
    let newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success: false, msg:'Failed to register user'});
        } else {
            res.json({success: true, msg:'User registered'});
        }

    });
});


/*****************************************Authenticate User*****************************************/

//Reference:
//MEAN Stack Front To Back
//Author: "Traversy Media"

app.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err){
            throw err;
        }
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) =>{
            if(err){
                throw err;
            }
            if(isMatch){
                const token = jwt.sign(user.toJSON(), mongoose.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user:{
                        id:user._id,
                        fname: user.fname,
                        lname: user.lname,
                        username: user.username,
                        email: user.email
                    }
                });
            } else{
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

/*****************************************Protect Profile*****************************************/

//Reference:
//MEAN Stack Front To Back
//Author: "Traversy Media"

app.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});


//app.use(cors());
//app.use(bodyParser.json());

// app.post('/login', function(req, res, next){
//     passport.authenticate('local', function(err, user, info){
//         if(err){
//             return res.status(501).json(err);
//         }
//         if(!user){
//             return res.status(501).json(info);
//         }
//         req.logIn(user, function(err){
//             if(err){
//                 return res.status(501).json(err);
//             }
//             return res.status(200).json({message:'Login Success'});
//         });
//     }) (req, res, next);
// })

// app.delete('/category/:categoryId', (req, res) => {
//     const deleteCategory = (category) => {
//         Question.deleteMany({_categoryId: category._id})
//             .then(() => category)
//             .catch((err) => console.log(err));
//     }
//     const category = Category.findByIdAndDelete(req.params.categoryId)
//         .then((category) => deleteCategory(category))
//         .catch((err) => console.log(err));
//     res.send(category);
// })


/*****************************************Customer Endpoints*****************************************/

app.get('/customer', (req, res)=> {
    Customer.find({})
        .then(customer => res.send(customer))
        .catch((err) => console.log(err));
})

app.get('/customer/:customerId', (req, res) => {
    Customer.findOne({_id: req.params.customerId})
        .then(customer => res.send(customer))
        .catch((err) => console.log(err));
})

app.post('/customer', (req, res) => {
    (new Customer({'title': req.body.title, 'clientId': req.body.clientId}))
        .save()
        .then((customer) => res.send(customer))
        .catch((err) => console.log(err));
})

app.patch('/customer/:customerId', (req, res) => {
    Customer.findOneAndUpdate({'_id': req.params.customerId}, { $set: req.body })
        .then(customer => res.send(customer))
        .catch((err) => console.log(err));
})


/*****************************************Response Endpoints*****************************************/

app.get('/response', (req, res)=> {
    Response.find({})
        .then(customer => res.send(customer))
        .catch((err) => console.log(err));
})

app.get('/response/:responseId', (req, res) => {
    Response.findOne({_id: req.params.customerId})
        .then(customer => res.send(customer))
        .catch((err) => console.log(err));
})

app.get('/response/:customerId/responses', (req, res)=> {
    Response.find({_customerId: req.params.customerId})
        .then(response => res.send(response))
        .catch((err) => console.log(err));
})

app.post('/add-response/:customerId', (req, res) => {
    (new Response({
        "customerName": req.body.customerName,
        "clientId": req.body.clientId,
        _customerId: req.params.customerId,
        'categoryName': req.body.categoryName,
        '_categoryId': req.body._categoryId,
        'domainName': req.body.domainName,
        '_domainId': req.body._domainId,
        'question': req.body.question,
        'response': req.body.response,
        'date': req.body.date}))
        .save()
        .then((customer) => res.send(customer))
        .catch((err) => console.log(err));
})

app.listen(3000, ()=>console.log("Hello Server Connected"));

/**************************************TESTING**************************/

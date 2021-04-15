const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const session = require('express-session');
const c = require('./Utility/demo');

const { check, validationResult } = require('express-validator');

const MongoDBStore = require('connect-mongodb-session')(session);

require('dotenv').config();

var connection = process.env.MONGODB_URI;
const app = express();
app.use(morgan('tiny'));

//Database connection
mongoose.connect(
    connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(console.log('database connected')).catch((error) => {
    if (error) console.log("Error in database Connection");
});
const PORT = process.env.PORT || 7777;
//setting body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Public folder
app.use(express.static(path.join(__dirname, 'public/')));
app.use('/upload', express.static('upload'));
app.use('/uploadedProducts', express.static('uploadedProducts'));

//EJS
app.use("views", express.static(path.join(__dirname, "views")));
app.set('view engine', 'ejs');
var genuuid;

//Session Store
const store = new MongoDBStore({
    uri: connection,
    collection: "UserSession",
});

app.use(session({
    secret: 'avorika',
    resave: false,
    saveUninitialized: false,
    store: store,
}));

//ROUTES 
app.use('', require('./routes/index'));
app.use('/index', require('./routes/index'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/home'));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/logout'));
app.use('/', require('./routes/product'));


app.listen(PORT, () => console.log('Server is running on...' + PORT));
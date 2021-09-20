require('dotenv').config();
require('./config/passport');

const express = require('express')
const app = express();
const { MONGO_URI, connectDB } = require('./db/connect');
const port = process.env.PORT || 3000;

const passport = require('passport')
const session = require('express-session');
const MongoStore = require('connect-mongo');

const auth = require('./routes/auth');
const pages = require('./routes/index');
const blog = require('./routes/blog');

app.use(express.urlencoded({ extended: "false" }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', auth);
app.use('/', pages);
app.use('/api/v1/blog', blog);

app.get('/some', (req, res) => {res.send('SOmthing')})

const start = async () => 
{
    try 
    {
        await connectDB(MONGO_URI).then(() => console.log('Successful connectiont to the DB...'));
        app.listen(port, () => console.log(`Server listening to port ${port}...`));
    } 
    catch (error) 
    {
        console.log(error);
    }
}

start();

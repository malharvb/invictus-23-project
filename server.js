require('dotenv').config();
const path = require('path')

const express = require('express');
const app = express();

const { MongoClient } = require('mongodb');

// Connection URL
const client = new MongoClient(process.env.MONGO_URI);

// Database Name
const dbName = 'DB';

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

const userRoutes = require('./routes/userRoutes')
const generalRoutes = require('./routes/generalRoutes')
const newsRoutes = require('./routes/newsRoutes')
const socialRoutes = require('./routes/socialRoutes')
const productInfoRoutes = require('./routes/productInfoRoutes')

const port = 4000;

app.use(
    (req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin","*");
        res.setHeader("Access-Control-Allow-Methods","*");
        res.setHeader("Access-Control-Allow-Origin-Headers","*");
        next();
    }
)

app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api', generalRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/social', socialRoutes)
app.use('/api/productInfo', productInfoRoutes)


async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to mongodb');
    const db = client.db(dbName);
    
    app.locals.db = db;
}

main().then( () => {
app.listen(port, () => {
    console.log("Server running on port 4000")
}) } )

const bodyParser = require("body-parser");
const ejs = require("ejs");
const sqlite3 = require("sqlite3").verbose();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false}));

const db = new sqlite3.Database("./users.db");

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, email TEXT, password TEXT, region TEXT)");
});
app.post("/signup", function(req, res) {
    // res.render('signup');
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var region = req.body.region;
  
    db.run("INSERT INTO users (username, email, password, region) VALUES (?, ?, ?, ?)", [username, email, password, region], function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect(`/api/home/?region=${region}`);
      }
    });
  });
  
  app.post("/login", function(req, res) {
    // res.render('login');
    var username = req.body.username;
    var password = req.body.password;

    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], function(err, user) {
      if (err) {
        console.log(err);
      } else if (user) {
        console.log(user)
        res.redirect(`/api/home/?region=${user.region}`);
      } else {
        res.redirect(`/api/home/?region=${user.region}`);
      }
    });
  });
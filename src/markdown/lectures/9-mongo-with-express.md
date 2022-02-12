---
number: 9
path: '/lectures/9-mongo-with-express'
date: '2021-11-07'
title: 'Using MongoDB with Express'
hidden: false
---

class: center, middle, block-text

# Lecture 9

## Express with a database (MongoDB) 

---

class: x-large

# Agenda

1. Why use MongoDB?
2. Installing MongoDB
3. Connecting it to Express

---

class: center, middle, block-text

# Why use MongoDB?

---

class: med-large

# The NoSQL Database Layer

- MongoDB is an open source database source, that lets you store arbitrary data as JSON objects
  (internally represented as [BSON](http://stackoverflow.com/questions/12438280/what-is-bson-and-exactly-how-is-it-different-from-json) data types).
- Lightweight, fast and reliable.
- MongoDB was written to work seamlessly with a JavaScript web stack.

---

class: med-large

## Installing MongoDB

Assuming you already have an Express app working locally, you can either host your
MongoDB database instance locally or on the cloud.

- If you're installing locally, you need to [install MongoDB](installing mongodb on windows) on your machine using homebrew.
- Install the NPM package for your application using `mongoose`

```bash
npm install mongoose
```

- There are many other options (e.g. `mongodb`), but here we are going to use `mongoose`

---

class: med-large

There are a few lines of code needed to connect your Express app to the database:

```js
const mongoose = require('mongoose')
const express = require('express')

const app = express()
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cw-lite'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.listen(3000, () => {
  console.log('listening on 3000')
})
```

The above code, which should reside in your `app.js` file, only starts the server once the connection is established.

---

class: med-large

## The MongoDB Connection URI

The MongoDB URI is a string that represents the location of your MongoDB database instance. If you're hosting this on your local machine, the connection URI is:

```js
'mongodb://localhost:27017/<name-of-your-db>'
```

If you're hosting your MongoDB instance on the [cloud](https://www.mongodb.com/cloud) then the connection URI will likely look something like this:

```js
'mongodb://<dbuser>:<dbpassword>' + // auth
'@ds04569826.mongolab.com:47955' + // mongolab host
  '/<your-db-name>' // specific db
```

---

class: x-large

# Example

Check out the code for the Penn Course Review homework assignment!

We connect using Mongoose, but the principles behind the connection are all the same.

---

class: large

# Fetching Data

Use the `find` or `findById` functions to select documents within collections and extract them from the database.

```js
app.get('/', (req, res) => {
  const quotes = db.collection('quotes')
  const all_quotes = quotes.find()
  const second_quote = quotes.findById(2)
})
```

---

class: center, middle, block-text

# Mongoose

## Straight-forward, schema-based solution to model your app data

[Website](http://mongoosejs.com)

---

class: large

# Schemas, Models, and Methods

- A mongoose *Schema* allows us to define attributes for the documents
- A mongoose *Model* is a "constructor" that allows us to make documents (think objects) that can be saved and retrieved from the database
- A mongoose *Method* can be defined on a Schema (think methods in a class).

...

---

class: med-large

# Basic Boilerplate

Similar syntax. Let's make a User *Model*!

```js
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cw-lite'
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const { Schema, model } = mongoose

const userSchema = new Schema({
  name: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  created_at: Date,
  updated_at: Date,
})

const User = model('User', userSchema)
```

---

class: large

# Custom Methods

Let's make our users cool!

```js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

userSchema.methods.coolify = callback => {
  // ref slide 12
  this.name = this.name + ' is cool'
  // standard callback pattern!
  callback(null, this.name)
})

const User = mongoose.model('User', userSchema)

module.exports = User
```

---

class: large

# Saving a Cool User

```js
const User = require('./user-module-location')

const devesh = new User({
  name: 'Devesh',
})

devesh.coolify(function (err, name) {
  if (err) throw err
  console.log(name) // Devesh is cool
})

devesh.save(function (err) {
  if (err) throw err
  console.log('User saved!')
})
```

---

class: large

# Get a User and update them

```js
var User = require('./user-module-location')

User.find({ name: 'Devesh' }, (e, user) => {
  if (e) throw e
  user.name = 'Devesh Dayal'
  user.save(err => {
    if (err) throw err
    console.log('User successfully updated!')
  })
})
```

---

class: large

# Delete a User

```js
User.deleteOne({ name: 'Devesh' }, e => {
  if (e) throw e
  console.log('User successfully deleted!')
})
```

---

class: large

# Do Something Before A User is Saved

```js
userSchema.pre('save', function (next) {
  var user = this
  // check to see if the password was changed
  if (!user.isModified('password')) return next()

  // bcrypt generates secure password hashes
  bcrypt.hash(user.password, 'salt', function (err, hash) {
    user.password = hash
    next()
  })
})
```

---

class: large

# Check a User's Hashed Password

```js
userSchema.methods.checkPassword = function (possiblePass, cb) {
  bcrypt.compare(possiblePass, this.password, function (err, isRight) {
    if (err) return cb(err)
    cb(null, isRight)
  })
}
```

---

class: large

# How to Use this to Log in someone

```js
app.post('/login', function(req, res) {
  username = req.body.username;
  password = req.body.password;

  if (User.findOne({ username: username },
    function (err, user) {
      user.checkPassword(password,
        function(err, isRight) {
          if (isRight) {
            // log them in using whatever
          } else {
            res.send('wrong');
          }
        });
```

---

class: center, middle, block-text

# User Authentication/Sessions

---

class: large

# Recall HW6

We used cookieSession to handle storing a session

A session (short for server side sessions), stores a session identifier (in miemory) to check to see what client is hitting a server.

- This becomes a bottleneck to maintain because you needt o keep track of all the different session identifiers in server memory

---

# Ideal Scenario

- We want to have some way of creating an identifier for each client that is unique tot hem, but doesn't require us to store a mapping on our server from string -> user

- We want to be sure that this identifier is unique, has no collisions with other identifiers, can encode some info, and can be decrypted easily provided we have a secret key

- The client then just passes this identifier along with any requests to the server

- For security, the token should have some way to indicate when it is expired

---

# Enter JWT (Token based authenication)

- JWT = JSON Web Token

> JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA.

- `xxxxx.yyyyy.zzzzz` (x = header, y = payload, z = signature)

- Cryptographically Secure (as far as we know)

- Optional Expiry date

- Can generate and verify on our server! Can decode on the client as well. But can't falsify a JWT.

---

# Create Token

```javascript
var payload = {
  id: user._id,
}
var token = jwt.sign(payload, secret)
```

---

# Verify Token

```javascript
jwt.verify(token, secret, (err, decoded) => {
  if (err) {
    // error
  } else {
    // if everything is good, save to request for use in other routes
  }
})
```

---

class: center, middle, block-text

# Example API Only Login System

---

class: center, middle, block-text

## Also check out [passport.js](http://passportjs.org/) for login schemes with facebook, google, twitter OAuth etc.

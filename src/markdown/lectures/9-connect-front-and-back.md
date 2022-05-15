---
number: 9
path: '/lectures/9-connect-frontend-backend'
date: '2022-03-24'
title: 'Connecting Frontend and Backend'
hidden: false
---

class: center, middle, block-text

# Lecture 9

## Connecting Frontend with Backend

---

class: large

# What have we done so far

1. We know how to write frontend using React
2. We know how to write backend using Express
3. We know how to use MongoDB and connect Express with MongoDB
4. We know how to use Postman to simulate user requests

So what's left? 🤔

---

class: large

# Revisit Client-Server Model

We need to somehow connect a React frontend and an Express backend into a single app so that
- user can see an interactive web page
- the web page can send requests to the backend for data processing by clicking on buttons, etc

We need something more than just Postman!

---

class: large

# Parcel 📦

Yes, we are going to use the same bundler for HW4 + HW5

And we are now doing server-side rendering

---

class: med-large

# Axios

`npm install axios`

- [docs](https://github.com/axios/axios)
- a extremely convenient way that allows React to send HTTP requests

```js
import axios from 'axios'

// get request
axios.get('/info')

// post request with a body
axios.post('/user', { questionText: '', author: '' })
```

---

class: med-large

# `server.js`

```js
const path = require('path')

app.use(express.static('dist')) // set the static folder

// THESE ROUTES SHOULD BE PUT AFTER ALL OTHER ROUTERS
// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// set the initial entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})
```

---

class: med-large

# Start both the client and server side

`npm install concurrently`

`npm install nodemon` (hot reload express backend upon changes)

```js
"scripts": {
  "build": "parcel frontend/src/index.html", // start the frontend
  "server": "node backend/index.js" or "nodemon backend/index.js", // start the backend
  "dev": "concurrently --kill-others \"npm run build\" \"npm run server\""
}
```

<!-- ---

class: med-larger

# Cont'd

To allows `async/ await` actions, add the following to `package.json`

```js
"browserslist": [
  "last 3 and_chr versions",
  "last 3 chrome versions",
  "last 3 opera versions",
  "last 3 ios_saf versions",
  "last 3 safari versions"
]
``` -->
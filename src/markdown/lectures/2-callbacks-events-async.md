---
number: 2
path: '/lectures/2-callbacks-events-async'
date: '2022-01-20'
title: 'Callbacks, Events, and Asynchronous Programming'
hidden: false
---

class: center, middle, block-text

# Lecture 2

## Synchronous/ Asynchronous Programming, Callbacks, Promises

---

class: med-large

## `console.log('pre-lecture logistics')`

- Waitlist should be resolved
- HW1 due tonight
- In-person starting next week

---

class: med-large

# Agenda

<!-- - A quick review of basic syntax -->
- What is Javascript?
- Downside of synchronous programming in Web
- Asynchronous programming?
- Solution 1: Callback functions
- Solution 2: Promises
- Solution 3: Async/ await

<!-- ---

class: small

## A few quick notes on the syntax

- template literals should be used with backticks
- `if (country === '') {...}` can be simplified to `if (country) {...}`
- a slightly different ES6 function declaration using the `function` keyword

```js
const garbage = function(a) {
  return a
}

const garbageUsingArrow = (a) => {
  return a
}

const elegantGarbage = a => a
``` -->

---

class: small

## What is Javascript?
- a weirdo, for sure
- Javascript is a synchronous, blocking, single-threaded programming language
- Synchronous: execute a program line by line
- Blocking: when the previous line is executing, the next line is waiting
- single-threaded: there's only a single process that can finish 1 task at a time (even when there are multiple cores)

![Assembly line](https://thumbs-prod.si-cdn.com/JA6O3w84obFWI7WMSO36UX03zeU=/1072x720/filters:no_upscale()/https://public-media.si-cdn.com/filer/1c/11/1c113495-5153-4040-b7ea-5a37acf4d525/ford_assembly_line_-_1913.jpg)

---

## Why is this bad?
- Because when you are in a browser, you want multiple things to happen at once. This is surprisingly common:

- User clicking on a button
- Making an HTTP request to a website
- Fetching data from a database

---

class: small

## Synchronous Programming 🤮 Example #1

- calculating 10 million dates, logs the last one to the console and adds a paragraph of text
- [Demo](https://mdn.github.io/learning-area/javascript/asynchronous/introducing/simple-sync.html)

```js
const btn = document.querySelector('button')
btn.addEventListener('click', () => {
  let myDate
  for(let i = 0; i < 10000000; i++) {
    let date = new Date()
    myDate = date
  }

  // look at console to see frontend output
  // 1. right click and select inspect
  // 2. Windows: Ctrl + Shift + J/ Mac: Cmd + Option + J
  console.log(myDate)

  let pElem = document.createElement('p')
  pElem.textContent = 'This is a newly-added paragraph.'
  document.body.appendChild(pElem)
})
```

---

class: small

## Synchronous Programming 🤮 Example #2

- trying to fill a canvas with blue color and pop an alert in my browser
- [Demo](https://mdn.github.io/learning-area/javascript/asynchronous/introducing/simple-sync-ui-blocking.html)

```js
const expensiveOperation = () => {
  for(let i = 0; i < 1000000; i++) {
    ctx.fillStyle = 'rgba(0,0,255, 0.2)'
    ctx.beginPath()
    ctx.arc(random(0, canvas.width), random(0, canvas.height), 10, degToRad(0), degToRad(360), false)
    ctx.fill()
  }
}

fillBtn.addEventListener('click', expensiveOperation)

alertBtn.addEventListener('click', () =>
  alert('You clicked me!')
)
```

---

class: med-large

## Asynchronous Programming

- We want to use asynchronous programming so that certain opeations can be non-blocking (i.e. it will not stop other programs getting executed by the main thread)
- Many Web API features now use asynchronous code to run, especially those that access or fetch some kind of resource from an external device, such as fetching a file from the network, accessing a database and returning data from it, accessing a video stream from a web cam, or broadcasting the display to a VR headset.

---

class: medium

### Call Stack, Web APIs, Callback Queue

- Synchronous Example:

```javascript
const sync = () => {
  console.log('first')
  console.log('second')
}
sync() // -> what does this output?
```

- Asynchronous Example:

```javascript
const async = () => {
  console.log('first')
  setTimeout(function () {
    console.log('i was running late')
  }, 5000)
  console.log('second')
}
async() // -> how about now?
```

---

class: med-large

## Let's talk call stacks

- [Demo](http://latentflip.com/loupe/?code=dmFyIGEgPSBmdW5jdGlvbigpIHsKICBjb25zb2xlLmxvZygnZmlyc3QnKTsKICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyAKICAgIGNvbnNvbGUubG9nKCdpIHdhcyBydW5uaW5nIGxhdGUnKTsKICB9LCA1MDAwKTsKICBjb25zb2xlLmxvZygnc2Vjb25kJyk7Cn07CmEoKTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)
- Anytime a JS function is called, it is added to the callstack. That call stack will process functions until there are none left.
- If that function being processed is a WebAPI or C++ API function (e.g. setTimeout, AJAX requests, etc), that function is called off the call stack, handled by the web API and inserted into a task queue.
- There is a constantly running event loop that checks to see if the call stack is empty.
  - If it is, it will remove elements from the task queue (FIFO style)

---

class: med-large

# What'll happen here?

```javascript
setTimeout(() => {
  console.log('woah')
}, 2)

let x = 1
while (x < 10000000000) {
  x = x + 1
}
```

---

class: med-large

## But here's the problem with asynchronous programming

- Asynchronous Web APIs and functions really give us a handy way of doing thing
- But here's the problem: what if our execution relies on the results of these asynchronous functions
- Example: the `csv-parser` in HW1

---

class: med-large

# Solution 1: Callback functions

A callback is a function that's bound to a single asynchronous call. It is passed as an argument to another function, with the expectation that it will be executed once some async task is finished.

Here's a very simple example using the built-in `setTimeout` function. It runs its callback after waiting a specified amount of time.

```js
const cb = () => {
  console.log('callback ran!')
}

// wait 500ms, then run the callback
setTimeout(cb, 500)
// --> 'callback ran!'
```

---

class: med-large

# Node-Style Callbacks

- Since so many operations rely on callbacks, a standard callback style has emerged in NodeJS:

```js
const cb = (err, results...) => {...}
```

- `err` contains an error, if one occurred; otherwise it should be `null`
- After `err`, there can be any number of results arguments containing data for the callback to consume.
- This standardization makes it possible to transform callbacks into more expressive formats.<!-- , such as [complex async operations](https://github.com/caolan/async), [Promises](http://mattgreer.org/articles/promises-in-wicked-detail/), or [Highland.js](http://highlandjs.org/) streams. -->

---

class: med-large

## PROBLEMS?!

Let's say I have several asynchronous functions that need to execute in series (i.e., one after the other). This would be necessary if, say, I'm writing logs to a file and I want them in order.

We _could_ do it by chaining callbacks, but this quickly gets messy:

```js
chooseToppings(function(toppings) {
  placeOrder(toppings, function(order) {
    collectOrder(order, function(pizza) {
      eatPizza(pizza)
    }, failureCallback)
  }, failureCallback)
}, failureCallback)
```

And I'm not even handling errors here. That would make this even messier.

---

class: small

## Solution 2: ES6: PROMISES 😎

Promises, built into all modern JS environments, solve the issues with callbacks. A promise can be thought of as a future value, and as such can be in one of three states: pending, fulfilled, or rejected. There is no guarantee of exactly when the operation will complete and the result will be returned, but there is a guarantee that when the result is available, or the promise fails, the code you provide will be executed in order to do something else with a successful result, or to gracefully handle a failure case.

```js
chooseToppings()
.then(toppings => {
  return placeOrder(toppings)
})
.then(order => {
  return collectOrder(order)
})
.then(pizza => {
  eatPizza(pizza)
})
.catch(failureCallback)
```

---

class: med-large

# Composing Promises

Promises are easy to compose. Let's say you wanted to run tasks doA and doB and the same time, and then run C when they are both done. Assuming the functions doA and doB both return promises:

```js
Promise.all([doA, doB])
  .then(values => {
    doC()
  })
  .catch(() => {
    console.log('error caught')
  })
```

The above code with callbacks is much more complex!

---

class: med-large

## But again, what's not so good about this?

- the chaining of `THEN` blocks can get messy
- how do I get the value of the variables outside the `THEN` blocks?

---

class: med-large

## Solution 3: PROMISES + ASYNC/ AWAIT 😎😎

- <mark>`await` can only be used inside `async` functions</mark>
- `await` can be put in front of any async promise-based function to pause your code on that line until the promise fulfills, then return the resulting value

```js
async () => {
  try {
    const toppings = await chooseToppings()
    const order = await placeOrder(toppings)
    const pizza = await collectOrder(order)
    await eatPizza(pizza)
  } catch e => {
    console.log(e)
  }  
}
```

---

class: med-large

## Composing promises using ASYNC/ AWAIT

```js
async () => {
  const values = await Promise.all([doA, doB])
  await doC()
}
```

---

class: med-large

## Using ASYNC/AWAIT to call APIs

- one concept we are going to be so familiar with in frontend is invoking APIs in order to fetch relevant info
- this process is asynchronous by default
- package widely used: `axios` (https://www.npmjs.com/package/axios)

```js
const axios = require('axios')

const func = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  console.log(data)
}

func()
```

<!-- ---

class: med-large

## I've hear about these callback things?

```javascript
// Usage: callbackFn takes `user` as first argument
function getUserFromDatabase(userId, callbackFn) {
  // some code that takes a while
  // gets user from database
  callbackFn(user)
}
```

---

class: med-large

## But how do we use it?

```javascript
var userId = 1234
var cb = function (user) {
  user.pets.push('Doggo')
}
getUserFromDatabase(userId, cb)
```

---

class: med-large

## OR

```javascript
var userId = 1234
getUserFromDatabase(userId, function (user) {
  user.pets.push('Doggo')
})
```

---

class: med-large

## I've hear about these callback things?

```javascript
function asyncfunction (param1, param2, ..., callbackFn) {
  // some code that takes a while does stuff
  // and produces a result
  callbackFn(result)
}
```

---

class: med-large

## So what's async about this?

```javascript
var userId = 1234
getUserFromDatabase(userId, function (user) {
  user.pets.push('Doggo')
})
var user2Id = 5678
```

What exactly is happening _in your app_ while `getUserFromDatabase` is running?

---

class: med-large

# In most languages...nothing

- Java, Python, etc. by default wait for every line to finish executing before going onto the next one
  - Blocking architecture.
  - What are some disadvantages to that?
  - How do people get around that? And what are the issues around doing those methods to get around blocking constraints?
- As you can probably guess (based on previous trends), JavaScript likes to be the odd one out
  - Nonblocking

---

class: med-large

Question:

## We return

```javascript
var userId = 1234
getUserFromDatabase(userId, function (user) {
  user.pets.push('Doggo')
})
var user2Id = 5678
```

---

class: center, middle, block-text

**`Me:`** JavaScript...what are you?

**`JavaScript:`** I'm a single-threaded non-blocking asynchronous concurrent language

**`Me:`** <iframe src="https://giphy.com/embed/4pMX5rJ4PYAEM" width="300" height="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/homer-simpson-the-simpsons-bush-4pMX5rJ4PYAEM">via GIPHY</a></p>

**`JavaScript:`** I have a call stack, an event loop, a callback queue, and some other APIs and stuff

**`Me:`** Ah...when are your office hours?

---

class: med-large

# What is asynchronous programming?

So far, most (if not all) of the programs you've written are _synchronous programs_. You write code, and each line is executed one after another.

However, this isn't a good model for situations where you need to wait for something to happen, or when you want two things to happen at once. In that case, you need _asynchronous programming_. This is surprisingly common:

- User clicking on a button
- Making an HTTP request to a website
- Fetching data from a database

---

class: large

# JavaScript is built for async

Thanks to its functional nature, JavaScript makes asynchronous programming pretty easy. We can bind functions to asynchronous calls, then handle the data we get back.

The simplest unit of async control flow is a **callback**. We'll get to that later, but a brief bit about the JS environment

---

class: medium

### Call Stack, Web APIs, Callback Queue, and what exactly is Synchronous and Asynchronous

- Synchronous Example:

```javascript
var sync = function () {
  console.log('first')
  console.log('second')
}
sync() // -> what does this output?
```

- Asynchronous Example:

```javascript
var async = function () {
  console.log('first')
  setTimeout(function () {
    console.log('i was running late')
  }, 5000)
  console.log('second')
}
async() // -> how about now?
```

---

class: med-large

## Let's talk call stacks

- [Demo](http://latentflip.com/loupe/?code=dmFyIGEgPSBmdW5jdGlvbigpIHsKICBjb25zb2xlLmxvZygnZmlyc3QnKTsKICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyAKICAgIGNvbnNvbGUubG9nKCdpIHdhcyBydW5uaW5nIGxhdGUnKTsKICB9LCA1MDAwKTsKICBjb25zb2xlLmxvZygnc2Vjb25kJyk7Cn07CmEoKTs%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)
- Anytime a JS function is called, it is added to the callstack. That call stack will process functions until there are none left.
- If that function being processed is a WebAPI or C++ API function (e.g. setTimeout, AJAX requests, etc), that function is called off the call stack, handled by the web API and inserted into a task queue.
- There is a constantly running event loop that checks to see if the call stack is empty.
  - If it is, it will remove elements from the task queue (FIFO style)

---

class: med-large

# What'll happen here?

```javascript
setTimeout(function () {
  console.log('woah')
}, 1000)

var x = 1
while (x < 10000000000) {
  x = x + 1
}
```

---

class: med-large

# What is a callback?

A callback is a function that's bound to a single asynchronous call. It is passed as an argument to another function, with the expectation that it will be executed once some async task is finished.

Here's a very simple example using the built-in `setTimeout` function. It runs its callback after waiting a specified amount of time.

```js
var cb = function () {
  console.log('callback ran!')
}

// wait 500ms, then run the callback
setTimeout(cb, 500)
// -> 'callback ran!'
```

---

class: med-large

# Node-Style Callbacks

- Since so many operations rely on callbacks, a standard callback style has emerged in NodeJS:

```js
var cb = function (err, results...) {...}
```

- `err` contains an error, if one occurred; otherwise it should be `null`
- After `err`, there can be any number of results arguments containing data for the callback to consume.
- This standardization makes it possible to transform callbacks into more expressive formats. , such as [complex async operations](https://github.com/caolan/async), [Promises](http://mattgreer.org/articles/promises-in-wicked-detail/), or [Highland.js](http://highlandjs.org/) streams.

---

class: med-large

## The Async Library: Motivations

Let's say I have several asynchronous functions that need to execute in series (i.e., one after the other). This would be necessary if, say, I'm writing logs to a file and I want them in order.

We _could_ do it by chaining callbacks, but this quickly gets messy:

```js
writeLogLine('This is the first line', function () {
  writeLogLine('This is the second line', function () {
    writeLogLine('This is the third line', function () {
      console.log('Done writing the logs.')
    })
  })
})
```

And I'm not even handling errors here. That would make this even messier.

---

class: med-large

# The Async Solution

We can do better than this by taking advantage of the standard callback format. Rather than those 'marching callbacks', we'll pass an array of functions into `async.series`.

```js
async.series(
  [
    function (callback) {
      writeLogLine('This is the first line', callback)
    },
    function (callback) {
      writeLogLine('This is the second line', callback)
    },
    function (callback) {
      writeLogLine('This is the third line', callback)
    },
  ],
  function () {
    console.log('Done writing the logs')
  }
)
```

A higher-order function that generates callbacks could save us some work here - do you see how?

---

class: med-large, shrink-top

## Wait, how does that work?

The idea behind `async.series` is actually quite simple. The trick is to call the asynchronous functions _recursively_. Here's a simple implementation that doesn't handle errors:

```js
var series = function (arr, finalCB) {
  var seriesHelper = function (index) {
    if (index === arr.length) {
      finalCB(null)
    } else {
      arr[index](function () {
        seriesHelper(index + 1)
      })
    }
  }
  seriesHelper(0)
}
```

---

class: med-large

## Exercise/Live Code Demo

Create a `asyncMap` function that accepts two parameters -- an array of async functions and a callback function. After all the callbacks are done, `asyncMap` should invoke the callback on the collection of results.

---

class: med-large

## Expected Behavior:

```javascript
var job1 = function (cb) {
  setTimeout(function () {
    cb('first')
  }, 900)
}

var job2 = function (cb) {
  setTimeout(function () {
    cb('second')
  }, 100)
}

var job3 = function (cb) {
  setTimeout(function () {
    cb('third')
  }, 300)
}

var jobs = [job1, job2, job3]
var callback = function (results) {
  console.log(results)
}

asyncMap(jobs, callback) //-> first, second, third
```

---

class: med-large

# Promises

Promises, built into all modern JS environments, solve the issues with callbacks. A promise can be thought of as a future value, and as such can be in one of three states: pending, fulfilled, or rejected. Promises are pending once first created, and, once they are either fulfilled or rejected, cannot be further changed. They take a function, that in turn is passed two functions, commonly named resolve and reject. You use these to set the state of the promise.

```js
var myPromise = new Promise(function (resolve, reject) {
  setTimeout(resolve, 3000)
})
```

This creates a promise that becomes fulfilled after three seconds.

---

class: med

# Anatomy of a Promise

You can instantiate a promise by calling `new Promise()`. The functions `resolve` and `reject` are used to determine whether to continue to the next `.then()` or the next `.catch()`

```js
new Promise(function (resolve, reject) {
  setTimeout(resolve, 3000)
})
  .then(function () {
    /* triggered if resolve was called */
    console.log('timer completed')
  })
  .catch(function () {
    /* triggered if reject was called */
    console.log('error caught')
  })
```

Note: Bluebird is a powerful promise library that offers additional features, similar to what the async library does for callbacks. -->

---

class: x-large

# Next time - Frontend

1. HTML + CSS
2. jQuery

---
number: 10
path: '/lectures/10-nextjs-gatsbyjs'
date: '2020-11-19'
title: 'NextJS and GatsbyJS'
hidden: true
---

class: center, middle, block-text

# Lecture 10

## NextJS and GatsbyJS

---

class: x-large

# Agenda

1. Revisit NextJS
2. Let's talk more about GatsbyJS

---

class: med-large

# Client-Side Rendering

The approach of using Parcel to connect frontend to backend is categorized under
CSR.

Recall what we did in `server.js`

```js
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})
```

---

**Parcel** 📦 bundles all the client-side React code into some static HTML, CSS, JS files that can be
sent from the backend. Bute note that all the routing and actual rendering are achieved from the frontend

```jsx
const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </Router>
)
```

---

# Why might CSR be bad?

![CSR](https://miro.medium.com/max/1400/1*CRiH0hUGoS3aoZaIY4H2yg.png)

---

# Alternate Solution: SSR

![SSR](https://miro.medium.com/max/1400/1*jJkEQpgZ8waQ5P-W5lhxuQ.png)

---

# NextJS

- [NextJS](https://nextjs.org/) is a framework built upon React that supports SSR with minimal configuration
- It does not consider React frontend and Express backend separately
- Instead, NextJS bundles the two together into a single server (compare to how when we are using Parcel, there are actually 2 servers)
- [Set up Guide](https://nextjs.org/docs)

---

# *pages*

- Recall *component* is an abstraction on HTML elements: a component can include multiple HTML elements
- NextJS has *page* which is an abstraction on components: each page can include multiple components
- if the page has a filename of `about.js`, it is mapped to `/about`

---

# GatsbyJS

- a perfect SSR solution if you do not need a backend
- like NextJS, Gatsby has this *page* abstraction
- A query language called [GraphQL](https://graphql.org/) is at the heart of GatsbyJS, which we will cover in the next lecture
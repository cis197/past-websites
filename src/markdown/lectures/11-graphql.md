---
number: 11
path: '/lectures/11-graphql'
date: '2020-12-03'
title: 'GraphQL'
hidden: true
---

class: center, middle, block-text

# Lecture 11

## GraphQL

---

class: x-large

# Agenda

1. What is GraphQL and why we need it
2. GraphQL example servers
3. How is GraphQL used in GatsbyJS

---

# Query Language + API Endpoints

- SQL:  `SELECT students from Students`
- But remember these only exist in the database, in order to expose these query results to the users, we need to use backend (e.g. `Express` server) to create API endpoints
- And this is where things become complicated

---

# API endpoints too complicated??
- With a regular `Express` server, we have to specify multiple endpoints
- Let's recall in CW lite, we had `POST` `/questions/add`, `Get` `/questions`, etc etc
- This leads to the problem where everytime a frontend dev needs certain info from the DB, backend dev has to create an entirely new API endpoint for that
- 🤔 🤔 Is there a way we can merge all these into one endpoint so that frontend devs can specify what they want?

---

# GraphQL

- Solution: come up with a new backend query language that allows the client/ frontend dev to describe the data it needs
- So instead of having `/api/questions`, we have a SUPER/ single endpoint that serves as a common interface for all DB info

```
query {
  questions {
    questionText
    author
  }
}
```

---
class: med-large

# GraphQL Query

- GraphQL **query** is just like a normal query, but it allows clients to describe what they want. GraphQL server will only send back those specified and no more (efficiency UP)

```
query Questions {
  questions {
    questionText
    author
  }
}

query Uesrs {
  users {
    username
  }
}
```

---

class: med-large

# GraphQL Mutation

- **Mutation** is just a modification to the database (e.g. `findOneAndUpdate`). You can specify variables that the mutation should take in

```
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}

{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```

---

class: small

# GraphQL Schemas + Types

- Just like in MongoDB, we have to define schemas, we also need the same thing for GraphQL

```
type Question {
  questionText: String
  author: String
}

type User {
  username: String!
}

type Book {
  title: String
  author: Author
}

type Author {
  name: String
  books: [Book]
}
```

---

# GraphQL Server Tutorials and example code

- [GraphQL learn guide](https://graphql.org/learn/)
- [GraphQL Express Server starting guide](https://graphql.org/code/)
- [How to use GraphQL with MongoDB + mongooose](https://www.compose.com/articles/using-graphql-with-mongodb/)
- Demo: [Jay: the Daily Pennsylvanian GraphQL server for pulling articles](https://github.com/dailypenn/jay)

---

# GraphQL in GatsbyJS

- Gatsby uses GraphQL to source all types of content (including JSONs, images, markdowns). All files will be parsed through the `gatsby-source-filesystem` and it's kinda like a data lake.
- For example, if you want to [programmatically create pages](https://www.gatsbyjs.com/tutorial/part-seven/#creating-pages) from markdowns, you will be using GraphQL
- Demo: CIS 197 Website
- If you want to [query certain file content](https://www.gatsbyjs.com/tutorial/part-five/#build-a-page-with-a-graphql-query), you will be using `staticQuery` from GraphQL
- Demo: [the Daily Pennsylvanian Project Pages](https://github.com/dailypenn/projects.thedp.com)

---

class: x-large

# Thank you!! 🥰

- The demo (~15-30 mins) is next Thursday & Friday (will post a signup sheet on CW soon)
- Hope everyone enjoyed this class!!
---
number: 7
path: '/lectures/7-gatsbyJS'
date: '2021-10-25'
title: 'Redux, Routing, CSR vs SSR, Deployment, GatsbyJS'
hidden: true
---

class: center, middle, block-text

# Lecture 7
## Redux, Routing, CSR vs SSR, Deployment, GatsbyJS

---

class: large

# `console.log (pre-lecture logistics)`
- HW5 will be released shorted after class (dynamic personal website)

---

class: large

# Agenda
- Finish the redux example from last lecture
- Routing
- Client-side Rendering vs Server-side Rendering
- Deployment
- GatsbyJS

---

class: center, middle, block-text

# Redux

## [Todo List app link](https://codesandbox.io/s/todo-app-with-redux-itg60)

---

class: med-large

# Quick Review on Redux

![Redux Flow](https://campuspro-uploads.s3.us-west-2.amazonaws.com/af6bb875-762b-4a9c-873f-6a3c7aab3d2a/48875cb0-53b5-4301-b21a-edb4d38af31e/redux.jpeg)

---

class: center, middle, block-text

# React Router

---

class: small

## Central Question

- So far, we have only seen a single-page component. But real websites have a lot of pages
- So the question is HOW TO CHANGE PAGES?
- Option 1 (BETTER):
  - Create a compile bundle for each page of components, put in separate directories, and serve those
  - Cons, lots of build steps, painful dev time, more bundles to keep track of.
  - Pros...lol
  - This is GatsbyJS + NextJS!
- Option 2:
  - Keep our single bundle
  - Have the browser somehow read what's in the URL bar + be able to change it
  - Mount and unmount components as you change the URL bar!
  - This is React Router!

---

class: med-large

# How to implement this

- [React Router Docs](https://reactrouter.com/web/guides/quick-start)

In a main app component:

```jsx
import React from 'react'
import Comp1 from './Comp1'
import Comp2 from './Comp2'

const App = () => (
  <div class="navigationBar">
    <p>This will always be here</p>
    <Route path="/some-route" component={Comp1} />
    <Route path="/person/:id?" component={Comp2} />
  </div>
)
```

---

class: center, middle, block-text

# How is content rendered in the browser

---

class: med-large

# How is content shown

- When rendering content on the webpage, the browser uses the rendering engine.
- Each browser typically has its own rendering engine: Gecko(Firefox), Webkit(Safari), Blink(Google).
- While the details of how these rendering engines work depends on which one you are using, these rendering engines follow a common framework which consists of several steps on how content is rendered.

---

class: med-large

# Step 1: Build the Docment Object Model (DOM) Tree

- After you type in a url and hit enter, the browser sends requests to the server hosting the website for the HTML. And whenever it sees a CSS/ JS link attached in the HTML files or some other assests, it will send a request to fetch those data.

![Step 1](https://miro.medium.com/max/1164/1*Il_mDUzygEpvPB9vc02M2w.png)

---

class: med-large

# Step 2: Build the CSS Object Model

- So now the browser has all the literal information about the webpage, but it also needs to know how these different HTML elements should be styled before it can finally render the full content.

![Step 2](https://miro.medium.com/max/1164/1*zfg0K6BD0PJEJRRpJrp2Zw.png)

---

class: med-large

# Step 3-5: Outputting everything we have

- Step 3 (The Render Tree): the browser, having both the DOM and CSS Object Model, will combine these two together to create a finalized tree that includes both the literal information and the styles
- Step 4 (Layout): the browser will now calculate the size and positions of each visible element on the page
- Step 5 (Paint): as the name of this step suggests, the browser literally takes whatever it has computed from Step 3 and Step 4 to paint things on the screen so the users can now see the actual stuff :)

---

class: med-large

# What will happen to the rendering path when JS files come along

- **JS is blocking the critical path**: When the browser sees a script tag, it blocks the DOM construction, waits for the JS files to be fetched and parsed by the JS engine before it goes to to CSS Object Model and finalizing the DOM tree.

![what happens when JS comes along](https://miro.medium.com/max/1400/1*gouuTGXzSY2lDn_CS2cAfw.png)

---

class: center, middle, block-text

# Client-side Rendering vs Server-side Rendering

## Why we need something more than just React?

---

class: med-large

# How are assets loaded on the webpage

- In general, there are two ways to process along the rendering path: Client-side Rendering (CSR) and Server-side Rendering (SSR).
- Everything we have built so far using React fall under **Client-side Rendering (CSR)**.

![CSR](https://miro.medium.com/max/1400/1*CRiH0hUGoS3aoZaIY4H2yg.png)

---

class: med-large

# SSR

- In contrast, there is another way of processing along the rendering path: Server-side Rendering (SSR).

![SSR](https://miro.medium.com/max/1400/1*jJkEQpgZ8waQ5P-W5lhxuQ.png)

---

class: med-large

# Advantages of SSR

- shorter loading time, better performance
- better Seach Engine Optimization (SEO): crawler can better fetch information from SSR websites
- In Chrome, try `site:[some url]`

![pennbasics](https://i.ibb.co/wywKm73/Screen-Shot-2020-04-02-at-9-06-21-AM.png)

![cis160](https://i.ibb.co/VjcHF6m/cis160.png)

---

class: center, middle, block-text

# Deployment

---

class: med-large

## Side Note: How JSX is transformed

As we have mentioned before, React code cannot be used directly used in the browser. Therefore, we have to use bundlers to transpile modern JS code and things like JSX into JS code which not-cutting edge browsers can understand. Popular options are [Webpack](https://webpack.js.org/) and [Parcel](https://parceljs.org/).

- `create-react-app` has built-in webpack configurations that performs the transformation process

With these bundlers and with pretty minimal config, we just use the same syntax that we're used to from Node in terms of importing packages from npm.

<div style="width: 100%; position: relative; display: flex; align-items: center;">
  <div style="flex: 1; width: auto;">
    <img alt="Parcel logo" src="https://user-images.githubusercontent.com/19409/31321658-f6aed0f2-ac3d-11e7-8100-1587e676e0ec.png" />
  </div>
  <div style="flex: 1; width: auto;">
    <img alt="Webpack logo" src="https://jonathanmh.com/wp-content/uploads/2017/01/webpack-logo.png" style="flex: 1; width: auto;" />
  </div>
</div>

---

class: center, middle, block-text

# GatsbyJS

---

class: med-large

# GatsbyJS

- Another layer built upon React that makes building way easier!
- What you have learned so far can all be directly used in GatsbyJS (~~with the exception of Redux~~)

<div style="width: 100%; position: relative; display: flex; align-items: center;">
  <div style="margin: auto; width: auto; width: 100px">
    <img alt="GatsbyJS logo" src="https://pbs.twimg.com/profile_images/1135999619781939201/HZ-pCQcP_400x400.png" />
  </div>
</div>

---

class: med-large

# Output of GatsbyJS

- **at build time**, all React code are directly compiled into static HTML, JS, CSS files (`npm run build`)
- the static files are readily available from the server hosting the website
- You can find all these files under the `public/` folder
- This makes GatsbyJS extremely fast and SEO-friendly 🥳

---

# Features of GatsbyJS

- FLEX TIME 😏 😏 😏
  - standard HTML websites: [CIS 160 Website](https://www.cis.upenn.edu/~cis160/current/)
  - GatsbyJS websites: [CIS 197 Website](https://www.seas.upenn.edu/~cis197/) & [CIS 320 Website](https://www.seas.upenn.edu/~cis320/)
- Routing rethinking
  - `Link` component: [internal links](https://www.gatsbyjs.com/docs/gatsby-link/) that fetch pages without refreshing
  - `<a href="xxx"/>`: external links
- [Lazy loading of images](https://www.gatsbyjs.com/docs/working-with-images/): render the skeleton of the image first and fill in more pixels later on
- [Programmatically create pages](https://www.gatsbyjs.com/tutorial/part-seven/) from markdowns, JSON files, etc
- [Incremental build](https://www.gatsbyjs.com/blog/2020-04-22-announcing-incremental-builds/): only re-build the HTML pages which content has changed

---

class: med-large

# Deployment of GatsbyJS

- basically any platform: Heroku, Netlify, GitHub Pages
- and all these are **free**!
- can be done with minimal configuration
- [Tutorial on GitHub Pages](https://www.gatsbyjs.com/docs/how-gatsby-works-with-github-pages/)

---

class: x-large

# Coming Up

- This wraps up our journey for frontend for now
- Backend: Express Server, APIs
---
number: 5
path: '/lectures/5-react-2'
date: '2022-02-10'
title: 'ReactJS More'
hidden: false
---

class: center, middle, block-text

# Lecture 5

## ReactJS More

---

class: med-large

## `console.log('pre-lecture logistics')`

- HW3 Pokemon due tonight
- HW4 released and due next week
- Great arts!!

---

class: x-large

# Agenda

1. Props passing
1. React Hooks
<!-- 1. Life cycles -->
1. Conditional rendering
1. Import and Export (revisited)
1. Styling in React

---

class: center, middle, block-text

# Passing `Props`

---

- props passing are done using `key={value}`
- EXCEPTION: strings can be passed using double quotes
- EXCEPTION: if no `={value}`, then it means `={True}` the boolean value

```js
const ls = []

const App = () => {
  return (
    <Comp1 str="hello world" ls={ls} bool/>
  )
}
```

---

class: center, middle, block-text

# React Hooks

## `useState` and `useEffect`

---

## `useState`

- The way React knows what is new to re-render is by maintaining a pool of states and check if any one of them was updated
- Therefore, `state` created using `useState` should be treated as immutable. Please do not change original values, especially when coming to **list** and **object**!
- See another way of using `setState` to update list and object [here](https://www.techiediaries.com/react-usestate-hook-update-array/)

```js
import React, { useState } from 'react'

const [state, setState] = useState(default value)


// USE SPREAD OPERATOR
// in the case of array
setState([...state, newElement])

// in the case of object
setState({ ...state, key: value })
```

---

## `useEffect`

- perform side effects in functional components
- runs after the first render and after every update/ re-render
- use dependencies array to control when `useEffect` is executed

```js
import React, { useState, useEffect } from 'react'

const Example = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}
```

---

## `useEffect` and APIs

- we only want the API fetching once so dependencies array is `[]`

```js
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const [info, setInfo] = useState({})

useEffect(async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  setInfo(data)
}, [])
```
---

class: center, middle, block-text

# Conditional Rendering

---

## Conditional Rendering

- either using `if/else` or using `&&`

```js
const comp1 = () => {
  if (...) {
    return (...)
  }

  return (...)
}

const comp2 = () => {
  const [state, setState] = useState(...)

  return (
    <>
      {state && (<div>hello</div>)}
    </>
  )
}
```

---

class: center, middle, block-text

# Imports and Exports

---

## `export default`

- export 1 component and import 1 component
- recommended for main component

```js
// export.js
export default Comp

// import.js
import Comp from './export'
```

---

## `export const`

- export multiple components and import multiple components
- recommended for shared components

```js
// file1.js
export const comp1 = () => ()

// file2.js
export const comp2 = () => ()

// index.js
export * from './file1'
export * from './file2'

// import
import { comp1, comp2 } from './'
```

---

class: center, middle, block-text

# CSS styling hacks 💅

---

# What is CSS?

**C**ascading **S**tyle **S**heets

Yeah Peter already kind of took you through the basics

- Declarative, ordered way of defining styles

```css
p {
  font-family: 'Impact', sans-serif;
}

p.funny {
  background-color: red;
  color: green;
}
```

---

# Quick CSS (re)fresher

- The "cascading" in CSS
- General sizing rules
- Pseudo-selectors and Breakpoints??
- `display` - `flex` and `grid`

---

# Wtf does "cascading" mean

Rules are applied by __specificity__ and then by __order__:

```css
.card h2 {
  /* this is more specific so it overrides our other selector!! */
  font-size: 30px;
}

h2 {
  /* even though this is later, it's not as specific :( */
  font-size: 40px;
}
```

This can be overridden by `!important`, but this is an OP move

---

# Sizing rules

- Everything inside the border (so content + `padding`) is clickable + counts
  as the element itself
- Use `margin` (or other layout rules) to actually separate elements

![Element sizing](https://qph.fs.quoracdn.net/main-qimg-2f96cdda5b72f25839179d0f4e8e23b7)

---

# Pseudo-selectors

CSS allows rules to only apply under certain conditions:

```css
.button:hover {
  /* only apply these properties when hovering over button! */
}
```

Lets your view be more dynamic __without scripting__!

---

# Breakpoints

```css
@media screen and (min-width: 800px) {
  .container {
    /* these properties only apply when the screen is at least 800px wide! */
  }
}
```

This can be used to adapt your page's layout or other styling depending on what
device is accessing it! (aka responsiveness)

---

# Flexbox 😍😍

[Cheatsheet](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) or [other cheatsheet](https://flexbox.malven.co/) (there are a lot of these)

- For arrangements of items of __unknown__ or __flexible__ size
- Allows rows, columns, wrapping, stretching, etc

![Flexbox](https://cdn.hashnode.com/res/hashnode/image/upload/v1620717092592/Z2mms14he.gif?w=1600&h=840&fit=crop&crop=entropy&auto=format,compress&gif-q=60&format=webm)

---

# CSS Grid

[Cheatsheet](https://css-tricks.com/snippets/css/complete-guide-grid/)

- For arranging things in a __set grid pattern__ without table elements or floats
- Flexible notation, allows aligning items, rows, or columns however you like, and sizing them flexibly as well

![CSS Grid](https://css-tricks.com/wp-content/uploads/2018/11/dddgrid-template-areas.svg)

---

# Plug

Make sure to use free resources! There are so many!!

- [W3Schools](https://www.w3schools.com/)
- [CSS-Tricks](https://css-tricks.com/)
- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)
- [Google!!!](https://preview.redd.it/w8cqoe8k7zf11.jpg?auto=webp&s=e0c6ae4ffe72e784c2a9520646ffb0eaa045f91d)

![The Internet](https://thenextweb.com/wp-content/blogs.dir/1/files/2015/02/keyboard_surfing_the_internet2-406x450.jpg)

---

# Original purpose of CSS

CSS was originally created to standardize styling rules across the internet

But more importantly it can organize styling rules into a separate document...

to **unclutter document markup** and to make styles **reusable**. (these problems will come back.)

Example: inline styles (🤮)

```html
<div style="font-family: 'Fancy', sans-serif; background-color: #454545">
  <h1 style="font-weight: bold; font-size: 40px">Oi bruv</h1>
</div>
```

- Quickly builds up in size and we have to copy/paste to reuse

- Painful to look at!!

---

# With an external stylesheet

```html
<div>
  <h1 class="big"> I'm big! </h1>
</div>

<h4 class="big"> I'm also big! </h4>
```

```css
div {
  font-family: "Fancy", sans-serif;
  background-color: #454545;
}

.big {
  font-weight: bold;
  font-size: 40px;
}
```

😍😍😍 nice and organized! modular even

---

In a React context:

```js
import "index.css"

// our styles will just exist globally!
const App = () => <div className="funny" />

export default App
```

Our bundler should handle this, either injecting our styles using JS or just sending
a separate CSS file that combines all imported stylesheets!

---

# Raw CSS approach:

### Pros 👍

- Direct control over style definitions
- Extremely low performance overhead
- You know for sure every mistake is your own

### Cons 👎

- Difficult to organize nested style definitions
- Maximal work to write functional and compatible styles
- You know for sure every mistake is your own

live code: `lecture4 / 1.static`

---

# Consistency between browsers

Different browsers have different default styles... (the world hates frontend devs)

## [Normalize.css](https://necolas.github.io/normalize.css/)

Provides consistent styling of most html tags between browsers!

Use their CDN link... or compile into/serve with your project using whatever build toolchain

---

class: center, middle, block-text

Speaking of CSS libraries...

## What if we don't want to write our own styles? 🤔

---

# [Bootstrap](https://getbootstrap.com/)!!

- Premade style sheets! No selector/rule work besides knowing Bootstrap class names
- __Layout__, __utility__ and __component__ CSS class names
- Used by like a million people so you know it's dependable
- Mobile-First (?)

![Bootstrap](https://getbootstrap.com/docs/5.1/assets/img/bootstrap-icons.png)

---

# To clarify

- __Layout__ class names are for arranging all of your content. Bootstrap has a very
  clean, controlled system for this that people love.

`container`, `row`, `col-sm`, `col-md` <-- breakpoints! (we'll talk about these in a sec)

- __Utility__ class names can add spacing, modify colors or other minute styles of
  elements. Useful for polishing up the look of your page after you have layout down.

`mb-5`, `text-danger`, `w-100`, `h2`, `list-unstyled`

- __Component__ class names are for distinct component element styling - such as
  buttons, modals, lists, etc - to save you time you would otherwise spend writing
  in several specific style rules.

`btn`, `btn-warning`, `modal`, `card`

---

## How 2 Use

```html
<head>
  <!-- viewport scaling..? -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- bootstrap import! -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>
<body>
  <div class="h1"> AH! HELLO! </div>
</body>
```

No Javascript Required 😱

---

# Basically

Bootstrap is sick. and there are plenty of frameworks like it:

- Bulma
- Foundation (this one is wacky but cool)
- Ant Design
- Semantic UI

And, as we'll find out later, all of these have _React_ bindings!!

---

# Quick aside: responsiveness

```css
.mt-5 {
  margin-top: 5rem;
}

/* medium screen breakpoint */
@media screen and (min-width: 768px) {
  .mt-md-5 {
    margin-top: 5rem;
  }
}
```

Bootstrap lets us add conditional properties. But why use `min-width`? Why not just develop a
desktop site, and then add conditional rules for when the screen is __small__?

---

# "Mobile-first design"

Mobile users are the __majority!__ So why design for desktop first?

- Forces designers to consider mobile appearance of complex elements from the start so things
  won't break when scaling down
- Encourages generally straightforward (essential) functionality over fancy flourishes
- Enhances mobile performance and stability for our beautiful majority

---

# Classic™️ Bootstrap approach

### Pros 👍
- Super quick prototyping for anyone
- Consistent class names and the like between projects
- Hard to make look bad

### Cons 👎
- Not as flexible as writing your own styles
- Clients download styles you may not really be using (164kb, but still...)
- You don't feel as cool

live code: `lecture4 / 1.static`

But now let's go back to the world of writing our own style sheets (evil)

---

# Nasty plain css stuff 💀

How do we organize all this bs..? What does it mean??

```css
.fancy {
  font-family: 'Fancy', sans-serif;
  font-weight: 400;
}

.big {
  font-size: 30px;
}

/* select .big elements that are also .fancy */
.big.fancy {
  font-size: 40px;
}

/* select a elements inside .fancy elements */
.fancy a {
  color: black;
}
```

---

# Enter SASS/SCSS/Less

[**Sass**](https://sass-lang.com/) 🕶 can eliminate repitition, improve readability, and consolidate our style rules!

```scss
.big {
  font-size: 30px;

  &.fancy {
    font-size: 40px
  }
}

.fancy {
  font-family: 'Fancy', sans-serif;
  font-weight: 400;

  a {
    color: black
  }
}
```

---

# How..?

- Does not actually add any more to what your _browser_ is given
- Sass compiles static `.css` files from `.scss` files
- This adds a small layer to your (probably already massive) build toolchain

Let's look at some features!!

---

# Variables??

Ok they're not mutable - but they're still super useful!!

Now we only have to change one value and all of our styles will update accordingly!

```scss
$font-size-base: 13px;
$color-primary: #2020f0;

body {
  font-size: $font-size-base;
}

.big {
  font-size: $font-size-base * 2;
  color: $color-primary;
}

.button {
  // ...
  .primary {
    color: white;
    background-color: $color-primary;
  }
}
```

---

# Connecting separate files

```scss
// _base.scss
$font-stack: 'Fancy', sans-serif;
$font-size: 13px;
$color-text: #101010;

body {
  font-family: $font-stack;
  font-size: $font-size;
  color: $color-text;
}
```

```scss
// index.scss
@use 'base';

.big {
  font-size: base.$font-size * 2;
}
```

---

# Functions????

Called "mixins"

```scss
@mixin rtl($property, $ltr-value, $rtl-value) {
  #{$property}: $ltr-value;

  [dir=rtl] & {
    #{$property}: $rtl-value;
  }
}

.sidebar {
  @include rtl(float, left, right);
}
```

(taken from sass website hehe)

---

# Pre-processor (SASS) approach

### Pros 👍

- Direct control over style definitions
- Very flexible and sortable rule definition (mixins, variables, import/export)
- Every mistake is probably your own

### Cons 👎

- You will need to put in a lot of effort to stay organized
- Slight addition to build toolchain
- Every mistake is probably your own

live code: `lecture4 / 2.compiled`

---

Hold up - let's check that Bootstrap website again...

![Bootstrap splash](https://i.imgur.com/CNMCjBY.png)

---

# Bootstrap x Sass

- Bootstrap gives us a bunch of Sass variables and mixins!!
- We can even customize Bootstrap using Sass!
- Gives us the best of both worlds: allowing us to choose exactly what we want
  to send to our user, without writing it from scratch - except it's a bit more
  organization work.

live code: `lecture4 / 2.compiled`

Before we get to the reason you're here...

---

# Quick note: CSS compatibility stuff (demonic)

[Not every modern CSS feature](https://caniuse.com/css-grid) is supported by every browser...

In many cases our rules will have to look like this:

```css
p {
  -webkit-appearance: button;
     -moz-appearance: button;
          appearance: button;
}
```

---

## Transforming our styles

Since we're already pre-processing most of the code we write, why not fully transform it? 

[PostCSS](https://postcss.org/)

But this toolchain stuff is complicated so... it's probably best to find some existing tools
like Webpack or Parcel that have plug-and-play compatibility with these features.

## browserslist?

Just like __Babel__ makes new JS work on older systems, __autoprefixer__ (plugin for PostCSS)
will try to make your CSS rules as compatible as possible with whatever browsers you specify.

```json
{
  "browserslist": [
    ">.25%",
    "last 2 versions"
  ]
}
```

PostCSS and its plugins will be useful in our star-of-the-show strategies...

---

class: center, middle, block-text

# React

aka Hold Up The Markup Is Modular Now ??

---

## We can still do inline styles

...and it is just as nasty as before:

```jsx
const App = () => (
  <div style={{ color: 'black', backgroundColor: 'white' }}>
    <h1 style={{ fontSize: '50px' }}> This was painful to write 💀💀 </h1>
  </div>
)
```

So let's look at some common strategies to avoid this!!

---

# React Strat 1: CSS Modules

PostCSS along with some frameworks (webpack, parcel, etc) allow us to do this Funky Thing:

```css
/* styles.module.css */
.fancy {
  font-family: "Comic Sans MS", sans-serif;
}
```

```jsx
/* app.jsx */
import * as styles from "styles.module.css";

// just plug it into the className prop!
<div className={styles.fancy}> I'm fancy!!! </div>
```

This works for Sass files too!

---

# What's really happening? Why?

Essentially, CSS modules are a way to __alias class names__. Even if we have
like 30 different components that all have some `.button` part in them, as long as we have them
each in their own module then the `.button` classes will never collide!

Bundlers will take all the modules imported by different scripts, and crunch them all together
(keeping class names consistent in scripts) into a compact, usually minified CSS file to send to clients.

---

# CSS Modules

### Pros 👍
- We have direct control over styles still
- No longer have to worry about distinct class names
- Lets us keep our style code organized the same way we organize our components
- We can get all the features of SCSS as well!
- Runtime performance is about the same as plain CSS!

### Cons 👎
- You gotta write all the rules yourself. Classic
- Still takes effort to organize rules and hierarchy
- You know for sure every mistake is your own of course

live code: `lecture4 / 3.react`

---

But wait a minute..

### Our "HTML" is now modular... why not just put the styles in our JSX?

# 🤔🤔🤔

---

class: center, middle, block-text

# Introducing "CSS-in-JS"

Surprisingly actually functional

---

# React Strat 2: Styled Components

`styled-components` allow you to literally just write CSS in your JS

This dude figures out (at runtime, or SSR) exactly what class names your page need injected.
Then it injects them into your document and dynamically keeps them updated... Actual magic

![Styled Components](https://cdn-media-1.freecodecamp.org/images/-bmCEVFtIS2uUfrccPhudu7cIVRtoBywTexv)

---

## styled-components in action

```jsx
import styled from 'styled-components'

const FancyDiv = styled.div`
  font-family: "Comic Sans MS", sans-serif;
  font-size: 42px;
`
// ^ 'tagged template literal' - calls the div function with string as parameter

// now we can use this component like a normal div!
<FancyDiv>
  This div will be fancy!
</FancyDiv>
```

We can just reuse `FancyDiv` without any extra className props or anything

---

## styled-components hates extra class names for variants

```jsx
const Button = styled.button`
  padding: 5px 8px;
  color: ${(props) => props.primary ? 'white' : 'black'};
  background-color: ${({ primary, theme }) => primary ? theme.white : theme.primary};
`
// each expression is fed to the template's expression as a subsequent argument!
// also props.theme is a thing (very cool)

// nice, now we just use a prop!
<Button> Click me! </Button>
<Button primary> No, click me! </Button>
```

---

## styled-components advanced usage if you are insane

```jsx
const bannerVariants = {
  base: {
    color: 'black',
    bg: 'transparent',
  },
  alert: {
    color: 'red',
    bg: 'rgba(255, 0, 0, .2)';
  },
}

const Banner = styled.div`
  color: ${({ variant }) => bannerVariants[variant].color};
  background-color: ${({ variant }) => bannerVariants[variant].bg};
`

<Banner variant="alert">
  This is an alert!
</Banner>
```

This kind of easily breakable key stuff is where Typescript can come in super handy!
```ts
export type BannerVariant = keyof typeof bannerVariants /* only keys! */
```

---

# Styled Components

### Pros 👍
- Direct control over style rules (classic)
- As organized as your React code is
- Flexible prop system and the like

### Cons 👎
- A bit gross to look at. But not that bad, not much fluff - especially with a syntax highlighter
- Performance... but honestly the performance is fine, it's a bit more client-side calcs,
  and the extra download size is really nothing compared to React (and doesn't exist if using SSR)
- You know every mistake is your own™️

live code: `lecture4 / 3.react`

---

class: block-text, middle, center

# Tailwind CSS ❤️❤️❤️

In practice [Tailwind](https://tailwindcss.com/) is like Bootstrap™️, but with __only utility classes__. so why do i love it so much??

![Tailwind CSS](https://i.imgur.com/DYxZxgo.gif)

---

# Why Tailwind???

- Scans through your code 🔎 and __automatically generates 1 static stylesheet at compile time__
  which only includes class names that you've actually used! 😍
- All that clunky Sass customization for Bootstrap (or other CSS libraries) is gone - it's
  totally configurable with a very organized, straightforward JS config file 🔧
- Even if you want to make component classes or just not touch their utility classes, you
  can just use tailwind directives inside your own CSS files (`@apply`)

Tailwind relies heavily on the idea that styles don't need to be another layer of abstraction on
top of component-based interface design. This really depends on what you're making...

Note - [Tailwind 3.0](https://tailwindcss.com/blog/tailwindcss-v3) got released recently - it improves
JIT compilation and allows for totally arbitrary properties. Go check it out!

---

## Basic tailwind example

```jsx
// looks just like bootstrap..! isn't this ugly??
const Button = ({ onClick, text }) => (
  <button
    onClick={onClick}
    className="p-2 rounded bg-blue-500 hover:bg-blue-400 text-white"
  >
    {text}
  </button>
)

<Button text="Click me!" onClick={() => {}}>
```

---

## Tailwind: component design x conditional styling

```jsx
// we have no dumb extra layers of styling abstraction!
const ListButton = ({ onClick, disabled, text }) => (
  <li>
    <button
      onClick={onClick}
      className={`w-full pl-4 py-2 ${ disabled
        ? 'text-gray-500 bg-gray-100'
        : 'hover:bg-blue-200'}`
      }
    >
      {text}
    </button>
  </li>
)

// a little ugly... but concise, and well integrated!

someArray.map(({ name, disabled }) => <ListButton text={name} disabled={disabled}>
```

---

## Tailwind design philosophy 🤯

Basically: we already have modularity in JSX components so why on earth would we
add on another layer and start to worry about hierarchical styling rules? It's
still flexible enough to let you do whatever you want with it... but "proper"
Tailwind usage will encourage you to make better, more reusable JSX code as well!

Pros 👍
- Encourages good JSX component design
- Shared skill across projects (like Bootstrap)
- Fairly quick prototyping
- Well optimized and compatible with any framework

Cons 👎
- You get horribly ugly lists of class names
- No pre-built components (unless you pay $)

live code: `lecture4 / 3.react`

---

## Just like before...

If we don't want to write our own styles, we can use React bindings for any
of the CSS libraries we talked about before... There's a new one of these out
every day, but they 100% work and let you __prototype super fast__!

Bindings tend to:
- Make JSX components that wrap plain DOM nodes with associated component class names
- Have variants and utility classes appear as props of those components

Examples:
- ⭐️ Semantic UI React
- Bootstrap React
- React Bulma Components
- etc...

No live code for this.. yet?

---

## But also

There are straight up React-only styled component libraries.
- ⭐️ MUI (Material UI)
- ⭐️ Chakra
- Rebass
- Fluent UI
- Ant Design
- Grommet
- Blueprint
- etc...

---

class: middle, center, block-text

# Picking a styling strategy
## 😬 😬 😬

---

# 🤔 🤔 🤔

Ultimately as you begin to use different styling strategies (or even just one)
you'll quickly see the minute pros and cons build up. But keep in mind:

- __Most tools are very upfront__ about how much work will be needed to make good use
  of them and how customizable they are. Look at example code and imagine writing that
  but times 100.

- __No one solution works best for everything__. Say you're making a highly personalized
  splash page with a set design in mind: utility first or opinionated frameworks may not
  fit this solution as well as those giving more minute control over styling. But building
  a frontend for a corporate web app will probably not require the same level of control,
  and will benefit much more from a quick-prototyping dev environment.

- __Users will only see the final product__. Although you should generally want to
  optimize your own development, over-engineering basic features can sometimes burn much
  more time than the small difference it makes is worth.

And remember: you can never finish a project if you switch CSS frameworks every other week!
Sometimes you just have to live with your bad decisions or risk multiplying your work time.

---

## Thanks for joining me today!!

And to this guy for making this program real!

![swapneel](https://www.cis.upenn.edu/~swapneel/images/me.JPG)


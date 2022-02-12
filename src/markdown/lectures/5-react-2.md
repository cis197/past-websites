---
number: 5
path: '/lectures/5-react-2'
date: '2021-10-11'
title: 'ReactJS More'
hidden: false
---

class: center, middle, block-text

# Lecture 5

## ReactJS

---

class: med-large

## `console.log('pre-lecture logistics')`

- Don't panic, Homework 4 is due **next Monday**
- Styles guide (please hard refresh)
- Lecture recordings of this semester should be available from now on

---

class: x-large

# Agenda

1. Finish off emoji search
1. Set up ESLint
1. React Hooks
<!-- 1. Life cycles -->
1. Conditional rendering
1. Import and Export (revisited)
1. Styling in React

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

# Styling

## CSS files, Inline styling, Styled Components

---

# CSS files

- use class names, IDs to add styled to HTML elements

```js
// import CSS file
import './App.css'

const App = () => {}

export default App
```

---

# Bootstrap

```js
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
</head>
```

---

# Inline styling

- as in HTML files, you can add in-line styles

```js
const App = () => {
  <div style={{ color: 'red', fontSize: '12px' }}>
  </div>
}
```

---

# Styled Components

- the way I think is the best to style, you make styles component-wise
- install: `npm install styled-components`

```js
// import styled components
import s from 'styled-components'

const Wrapper = s.div`
  color: red;
  font-size: 12px;
`

const App = () => {
  <Wrapper>
  </Wrapper>
}
```

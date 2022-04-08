# @curiosbasant/react-compooks

This is my frequently used react hooks, which I'll install in almost every project I create or work on. So that I don't have to keep copy pasting the files in each project.

Most of them are inspired by WDS on `youtube`

To install

```bash
yarn add @curiosbasant/react-compooks
```

OR

```bash
npm install @curiosbasant/react-compooks
```

## React Hooks

These hooks can work on all react applications

### useDebugInfo

```jsx
function ExampleComponent() {
  const info = useDebugInfo("example-component")
  return (

  )
}
```

### useEffectOnce

Same as react's `useEffect`, but only run once the component mounts. _It doesn't requires any dependencies._

```jsx
function ExampleComponent() {
  const [loading, toggleLoading] = useToggle(true)

  useEffectOnce(() => {
    toggleLoading()
  })

  return // JSX
}
```

### useFunctionalReducer

```jsx
const ActionMap = {
  increment(draft, by = 1, allowNegative = false) {
    if (allowNegative || by > 0) {
      draft.count += by
    }
  },
  decrement(draft, by = 1) {
    draft.count -= by
  },
}
const initialState = {
  count: 0,
}

function ExampleComponent() {
  const [state, dispatch] = useFunctionalReducer(ActionMap, initialState)
  return (
    <div>
      <button onClick={() => dispatch.decrement()}>Decrement</button>
      <button onClick={() => dispatch.increment(-5, true)}>Increment</button>
    </div>
  )
}
```

### useRenderCount

Tracks the number of times, the component has been rerendered since last reset.

```jsx
function ExampleComponent() {
  const [count, reset] = useRenderCount()
  return (
    <div>
      <span>Render Count: {count}</span>
      <button onClick={() => reset()}>Reset Count</button>
    </div>
  )
}
```

### useToggle

Provides a bool value _(default false)_ that can be toggled.

```jsx
function ExampleComponent() {
  const [bool, toggleBool] = useToggle()
  return (
    <div>
      <span>Bool Value: {bool}</span>
      <button onClick={() => toggleBool()}>Toggle Bool</button>
    </div>
  )
}
```

### useValidatorState

Validates a state before updating it.

```jsx
function ExampleComponent() {
  const [value, setValue, isValid] = useValidatorState(5, (val) => val < 10)
  return // JSX
}
```

## React Web Hooks

These hooks only works in browsers

### useLocalStorage (and useSessionStorage)

Tries to get a value from browser's `localstorage`, if it doesn't exist returns the optionally provided default value, otherwise returns `null`.
The third return value, completely removes the key from localstrorage

```jsx
function ExampleComponent() {
  const [userId, setUserId, removeUserId] = useLocalStorage("userId", "default-id")
  return // JSX
}
```

### useEventListener

Listens to browser's dom events, on the optinally provided `element-ref` or `window` otherwise.

```jsx
function ExampleComponent() {
  const divRef = useRef()
  useEventListener("mouseover", () => {}, divRef)
  return <div ref={divRef}>Hover me!</div>
}
```

### useTimeout

Uses the `setTimeout` function, to run the callback after a certain amount of time. Also returns two methods viz. `reset` (to reset the time) and `clear` (to cancel)

```jsx
function ExampleComponent() {
  const { reset, clear } = useTimeout(() => {}, 1000)

  return // JSX
}
```

### useOnlineStatus

Uses the `useEventListener` hook, to detect if user has internet connectivity.

```jsx
function ExampleComponent() {
  const isOnline = useOnlineStatus()

  return // JSX
}
```

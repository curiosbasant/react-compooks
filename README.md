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

## useDebugInfo

```jsx
function ExampleComponent() {
  const info = useDebugInfo("example-component")
  return (

  )
}
```

## useEffectOnce

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

## useFunctionalReducer

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

## useRenderCount

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

## useToggle

Provides a bool value _(default false)_ that can be toggled, by 2nd provided function.

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

## useValidatorState

Provides a bool value _(default false)_ that can be toggled, by 2nd provided function.

```jsx
function ExampleComponent() {
  const [bool, toggleBool] = useValidatorState()
  return (
    <div>
      <span>Bool Value: {bool}</span>
      <button onClick={() => toggleBool()}>Toggle Bool</button>
    </div>
  )
}
```

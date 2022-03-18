import { useCallback, useState } from "react"

export default function useValidatorState<T>(
  initialValue: T,
  validationFunc: (prev: T) => boolean,
  updateInvalidState = true
) {
  const [state, setState] = useState(initialValue)
  const [isValid, setIsValid] = useState(() => validationFunc(state))

  const changeState = useCallback(
    (nextState: T | ((prev: T) => T)) => {
      const value = typeof nextState == "function" ? (<(prev: T) => T>nextState)(state) : nextState
      const isValid = validationFunc(value)
      if (updateInvalidState || isValid) setState(value)
      setIsValid(isValid)
    },
    [validationFunc]
  )

  return [state, changeState, isValid] as const
}

import { useState } from "react"

export default function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue)

  function toggleValue(forceSet?: boolean) {
    setValue((currentValue) => (typeof forceSet === "boolean" ? forceSet : !currentValue))
  }

  return [value, toggleValue] as const
}

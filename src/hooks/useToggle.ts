import { useState } from "react"

export default function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue)

  function toggleValue(forceSet?: boolean) {
    typeof forceSet == "boolean" ? setValue(forceSet) : setValue((currentValue) => !currentValue)
  }

  return [value, toggleValue] as const
}

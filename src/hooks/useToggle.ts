import { useState } from "react"

export default function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue)

  function toggleValue<T extends unknown>(forceSet?: T extends boolean ? boolean : unknown) {
    typeof forceSet == "boolean" ? setValue(forceSet) : setValue((currentValue) => !currentValue)
  }

  return [value, toggleValue] as const
}

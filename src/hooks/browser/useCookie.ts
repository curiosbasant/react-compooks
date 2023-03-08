import Cookies from "js-cookie"
import { useState } from "react"

import { tryParseJson } from "../../utils"

type HookReturnType<T> = [T, (nv: T) => void, () => void]

function useCookie<T extends { toString: Function }>(
  key: string,
  defaultValue: T
): HookReturnType<T>
function useCookie<T extends { toString: Function }>(key: string): HookReturnType<T | null>

function useCookie<T extends { toString: Function }>(key: string, defaultValue = null) {
  const cookieValue = Cookies.get(key)

  const [val, setVal] = useState<T | null>(cookieValue ? tryParseJson(cookieValue) : defaultValue)

  function setter(newValue: T) {
    Cookies.set(key, newValue.toString(), { path: "/" })
    setVal(newValue)
  }
  function destroyer() {
    Cookies.remove(key)
    setVal(defaultValue)
  }
  return [val, setter, destroyer]
}

export default useCookie

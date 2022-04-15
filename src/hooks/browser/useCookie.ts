import nookies from "nookies"
import { useState } from "react"

type CookieReturnType<T> = [T, (nv: T) => void, () => void]

function useCookie<T extends { toString: Function }>(
  key: string,
  defaultValue: T
): CookieReturnType<T>
function useCookie<T extends { toString: Function }>(key: string): CookieReturnType<T | null>

function useCookie<T extends { toString: Function }>(key: string, defaultValue = null) {
  const cookieValue = nookies.get(undefined)[key]
  const [val, setVal] = useState<T | null>(cookieValue ? JSON.parse(cookieValue) : defaultValue)

  function setter(newValue: T) {
    nookies.set(undefined, key, newValue.toString(), { path: "/" })
    setVal(newValue)
  }
  function destroyer() {
    nookies.destroy(undefined, key)
    setVal(defaultValue)
  }
  return [val, setter, destroyer]
}

export default useCookie

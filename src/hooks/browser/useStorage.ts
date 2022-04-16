import { useCallback, useEffect, useState } from "react"

type HookReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>, () => void]

function useStorage<T>(
  key: string,
  storageObject: Storage,
  defaultValue: T | (() => T)
): HookReturnType<T> {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key)
    return jsonValue != null
      ? (JSON.parse(jsonValue) as T)
      : typeof defaultValue === "function"
      ? (defaultValue as () => T)()
      : defaultValue
  })

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject])

  const remove = useCallback(() => {
    setValue(typeof defaultValue === "function" ? (defaultValue as () => T)() : defaultValue)
  }, [])

  return [value, setValue, remove]
}

function useLocalStorage<T>(key: string): HookReturnType<T | null>
function useLocalStorage<T>(key: string, defaultValue: T | (() => T)): HookReturnType<T>

function useLocalStorage(key: string, defaultValue = null) {
  return useStorage(key, window.localStorage, defaultValue)
}

function useSessionStorage<T>(key: string): HookReturnType<T | null>
function useSessionStorage<T>(key: string, defaultValue: T | (() => T)): HookReturnType<T>

function useSessionStorage(key: string, defaultValue = null) {
  return useStorage(key, window.sessionStorage, defaultValue)
}

export { useLocalStorage, useSessionStorage }

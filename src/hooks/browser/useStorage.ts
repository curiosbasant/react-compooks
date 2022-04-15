import { useCallback, useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, defaultValue: T | (() => T)) {
  return useStorage(key, defaultValue, window.localStorage)
}

export function useSessionStorage<T>(key: string, defaultValue: T | (() => T)) {
  return useStorage(key, defaultValue, window.sessionStorage)
}

function useStorage<T>(key: string, defaultValue: T | (() => T), storageObject: Storage) {
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

  return [value, setValue, remove] as const
}

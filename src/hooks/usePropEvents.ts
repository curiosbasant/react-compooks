import { useRef } from "react"
import useIsoMorphicEffect from "./useIsoMorphicEffect"

type GetEvents<T extends object> = {
  [K in keyof T as K extends `on${string}` ? K : never]: T[K]
}

/** This is being used to always return the latest snapshot of the events from the props. */
export default function usePropEvents<T extends object>(props: T) {
  const first = useRef({} as GetEvents<T>)

  useIsoMorphicEffect(() => {
    for (const propKey in props) {
      if (!propKey.startsWith("on")) continue

      // @ts-ignore
      first.current[propKey] = props[propKey]
    }
  })

  return first.current
}

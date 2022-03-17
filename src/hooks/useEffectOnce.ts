import { EffectCallback, useEffect } from "react"

const emptyArray: never[] = []

export default function useEffectOnce(cb: EffectCallback) {
  useEffect(cb, emptyArray)
}

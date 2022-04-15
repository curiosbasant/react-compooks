import { DependencyList, EffectCallback, useEffect, useRef } from "react"

export default function useAfterMount(cb: EffectCallback, deps?: DependencyList) {
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current && cb()
    mounted.current = true
  }, deps)
}

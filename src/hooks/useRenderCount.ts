import { useEffect, useRef } from "react"

export default function useRenderCount() {
  const count = useRef(1)
  useEffect(() => {
    count.current++
  })
  function reset() {
    count.current = 1
  }
  return [count.current, reset] as const
}

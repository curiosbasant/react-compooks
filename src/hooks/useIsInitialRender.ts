import { useEffect, useRef } from "react"

export default function useIsInitialRender() {
  let initial = useRef(true)

  useEffect(() => {
    initial.current = false
  }, [])

  return initial.current
}

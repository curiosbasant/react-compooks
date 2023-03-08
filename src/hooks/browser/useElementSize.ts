import { RefObject, useEffect, useState } from "react"

export default function useElementSize<T extends HTMLElement>(ref: RefObject<T>) {
  const [size, setSize] = useState<DOMRectReadOnly>()

  useEffect(() => {
    if (ref.current == null) return

    const observer = new ResizeObserver(([entry]) => entry && setSize(entry.contentRect))
    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return size
}

import { useEffect, useRef } from "react"

function useEventListener<K extends keyof WindowEventMap>(
  eventType: K,
  listener: (ev: WindowEventMap[K]) => any
): void
function useEventListener<K extends keyof WindowEventMap, T extends Document | HTMLElement | null>(
  eventType: K,
  listener: (ev: WindowEventMap[K]) => any,
  element: T
): void
function useEventListener<K extends keyof WindowEventMap>(
  eventType: K,
  listener: (ev: WindowEventMap[K]) => any,
  element = window
) {
  const callbackRef = useRef(listener)

  useEffect(() => {
    callbackRef.current = listener
  }, [listener])

  useEffect(() => {
    if (element == null) return
    const handler = (e: WindowEventMap[K]) => callbackRef.current(e)
    element.addEventListener(eventType, handler)

    return () => element.removeEventListener(eventType, handler)
  }, [eventType, element])
}

// options?: boolean | AddEventListenerOptions): void,
export default useEventListener

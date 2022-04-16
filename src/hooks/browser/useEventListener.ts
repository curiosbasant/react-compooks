import { useEffect, useRef } from "react"

function useEventListener<K extends keyof WindowEventMap>(
  eventType: K,
  listener: (ev: WindowEventMap[K]) => any
): void
function useEventListener<K extends keyof WindowEventMap, T extends Document | HTMLElement | null>(
  eventType: K,
  listener: (ev: WindowEventMap[K]) => any,
  element: T,
  options?: boolean | AddEventListenerOptions
): void
function useEventListener<K extends keyof WindowEventMap>(
  eventType: K,
  listener: (ev: WindowEventMap[K]) => any,
  element = typeof window == "undefined" ? null : window,
  options: boolean | AddEventListenerOptions | undefined = undefined
) {
  const callbackRef = useRef(listener)

  useEffect(() => {
    callbackRef.current = listener
  }, [listener])

  useEffect(() => {
    if (element == null) return
    const handler = (e: WindowEventMap[K]) => callbackRef.current(e)
    element.addEventListener(eventType, handler, options)

    return () => element.removeEventListener(eventType, handler, options)
  }, [eventType, element])
}

// options?: boolean | AddEventListenerOptions): void,
export default useEventListener

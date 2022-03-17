import { RefObject } from "react"
import useEventListener from "./useEventListener"

export default function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  cb: (ev: MouseEvent) => void
) {
  useEventListener(
    "click",
    (e) => {
      if (ref.current == null || ref.current.contains(e.target as Node)) return
      cb(e)
    },
    document
  )
}

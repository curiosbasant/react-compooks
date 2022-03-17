import { RefObject, useState } from "react"
import useEventListener from "./useEventListener"

export default function useHover<T extends HTMLElement>(ref: RefObject<T>) {
  const [hovered, setHovered] = useState(false)
  ref.current
  useEventListener("mouseover", () => setHovered(true), ref.current)
  useEventListener("mouseout", () => setHovered(false), ref.current)

  return hovered
}

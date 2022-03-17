import { useState } from "react"
import useEventListener from "./useEventListener"

export default function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine)
  const cb = () => setOnline(navigator.onLine)
  useEventListener("online", cb)
  useEventListener("offline", cb)

  return online
}

import { useCallback, useState } from "react"

export default function useFlags(initialFlags = 0) {
  const [flags, setFlags] = useState(BigInt(initialFlags))

  const addFlag = useCallback(
    (flag: number) => setFlags((flags) => flags | BigInt(flag)),
    [setFlags]
  )
  const hasFlag = useCallback((flag: number) => Boolean(flags & BigInt(flag)), [flags])
  const removeFlag = useCallback(
    (flag: number) => setFlags((flags) => flags & ~BigInt(flag)),
    [setFlags]
  )
  const toggleFlag = useCallback(
    (flag: number) => setFlags((flags) => flags ^ BigInt(flag)),
    [setFlags]
  )

  return { flags: Number(flags), addFlag, hasFlag, removeFlag, toggleFlag }
}

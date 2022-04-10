import { useEffect, useLayoutEffect } from "react"

const useIsoMorphicEffect = typeof window == "undefined" ? useEffect : useLayoutEffect
export default useIsoMorphicEffect

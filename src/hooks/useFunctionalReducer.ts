import produce, { Draft } from "immer"
import { useMemo, useReducer } from "react"

type RemoveFirstFromTuple<T> = T extends [infer F, ...infer R] ? R : never
type RemoveFirstParam<F extends (...args: any) => any> = (
  ...args: RemoveFirstFromTuple<Parameters<F>>
) => ReturnType<F>
export type Dispatcher<E extends Record<string, (...params: any[]) => void>> = {
  [Key in keyof E]: RemoveFirstParam<E[Key]>
}

function useFunctionalReducer<
  A extends Record<string, (draft: S, ...params: any[]) => void>,
  S extends Record<string, any>
>(actionMap: A, initialState: S): [Readonly<S>, Dispatcher<A>]
function useFunctionalReducer<
  A extends Record<string, (draft: S, ...params: any[]) => void>,
  S extends Record<string, any>
>(
  actionMap: A,
  initialState: Partial<S>,
  initialAction: (initial: Partial<S>) => S
): [Readonly<S>, Dispatcher<A>]
function useFunctionalReducer<
  A extends Record<string, (draft: S, ...params: any[]) => void>,
  S extends Record<string, any>
>(actionMap: A, initialState: S, initialAction?: any) {
  const cachedReducer = useMemo(
    () =>
      produce((draft, action) => {
        actionMap[action.type]?.(draft, ...action.payload)
      }),
    []
  )
  const [state, reactDispatch] = useReducer(cachedReducer, initialState, initialAction)
  const dispatch = useMemo(() => {
    const dispatch: Partial<{ [Key in keyof A]: () => void }> = {}
    for (const type in actionMap) {
      dispatch[type] = (...payload: any[]) => reactDispatch({ type, payload })
    }

    return dispatch
  }, [actionMap])
  return [state, dispatch]
}
export default useFunctionalReducer

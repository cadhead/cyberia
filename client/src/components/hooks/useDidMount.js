import { useEffect, useRef } from "preact/hooks"

export function useDidMount(callback) {
  const didMount = useRef(null)

  useEffect(() => {
    if (callback && !didMount.current) {
      didMount.current = true
      callback()
    }
  })
}

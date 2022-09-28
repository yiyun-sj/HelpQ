import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // @ts-ignore
    window?.analytics?.page(Component.displayName)
  }, [])

  return <div>Welcome!</div>
}

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // @ts-ignore
    window?.analytics?.page('testing')
  }, [])

  return <div>Welcome!</div>
}

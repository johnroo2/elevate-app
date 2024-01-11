import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'aos/dist/aos.css';
import AOS from 'aos'
import { useState, useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [displayData, setDisplayData] = useState<any>(null)

  useEffect(() => {
    AOS.init()
  }, [])
  
  pageProps = {displayData, setDisplayData, ...pageProps}

  return <div className="relative w-screen h-screen overflow-hidden">
    <div className="absolute inset-0 dots pointer-events-none"/>
    <Component {...pageProps}/>
    </div>
}

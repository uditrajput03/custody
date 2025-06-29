import { useState } from 'react'
import { NavBar } from './components/NavBar'
import { ThemeProvider } from './components/ui/ThemeProvider'
import { Hero } from './components/Hero'
import { Canvas } from './components/Canvas'
import { Footer } from './components/Footer'
import { Generate } from './components/Generate'
import { Toaster } from 'sonner'
import AnimationWrap from './components/AnimationWrap'
import { WalletMain } from './WalletMain'


function App() {
  // const [choose, setChoose] = useState(false)
  const [type, setType] = useState()
  const [phrase, setPhrase] = useState([])
  const clearWallet = () => {
    setType("")
    setPhrase([])
  }
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <Canvas>
          <div className='flex flex-col justify-between min-h-[100vh]'>
            <div>
              <NavBar />
              {
                !type &&
                <AnimationWrap>
                  <Hero setType={setType} />
                </AnimationWrap>
              }
              {
                (type && phrase.length==0) &&
                <AnimationWrap>
                  <Generate type={type} setPhrase={setPhrase}/>
                </AnimationWrap>
              }
              {
                (type && phrase.length>0) &&
                <AnimationWrap>
                  <WalletMain type={type} clear={clearWallet} phrase={phrase}/>
                </AnimationWrap>

              }
            </div>
            <Footer />
          </div>
        </Canvas>
      </ThemeProvider >
    </>
  )
}

export default App

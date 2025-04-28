import './App.css'
import { DataContext, DataProvider } from './hooks/DataContext'
import Speech from './components/SpeechWithEva'
import Chat from './components/ChatWithEva'
import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Info from './components/Info'

function App() {

  const { isChatActive, info, setInfo } = useContext(DataContext)

  const smDevice = window.innerWidth <= 645;

  return (
    <div className='app-div relative'>

      <div className={`sm:h-full sm:blur-none ${info ? 'blur-lg' : ''} flex sm:flex-row flex-col sm:justify-center md:gap-20 gap-2 `} onClick={() => setInfo(false)}>

        {(smDevice && !isChatActive) && < Hero />}
        {!smDevice && <Hero />}

        <div className={`${info ? 'blur-lg' : ''} `}>
          <Routes>
            <Route path='/' element={<Speech />} />
            <Route path='/chat' element={<Chat />} />
          </Routes>
        </div>

      </div>

      <Info />
      {(smDevice && !isChatActive) && < Footer />}
      {!smDevice && <Footer />}

    </div>
  )
}

export default App;



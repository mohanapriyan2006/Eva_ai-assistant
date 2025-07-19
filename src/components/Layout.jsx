import React from 'react'
import Speech from './SpeechWithEva'
import Chat from './ChatWithEva'
import { Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import Footer from './Footer'
import Hero from './Hero'
import Info from './Info'
import { DataContext } from '../hooks/DataContext'


const Layout = () => {
    const { isChatActive, info, setInfo } = useContext(DataContext)

    const smDevice = window.innerWidth <= 645;
    return (
        <>
            <div className={`sm:h-screen sm:blur-none ${info ? 'blur-lg' : ''} flex sm:flex-row flex-col sm:justify-center md:gap-20 gap-2 `} onClick={() => setInfo(false)}>

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
        </>
    )
}

export default Layout

import React, { useContext, useEffect } from 'react'
import { DataContext } from '../hooks/DataContext';
import mic from '../assets/mic.png'
import '../styles/SpeechWithEva.css'


const Speech = () => {

    const { startListening, voiceText } = useContext(DataContext)

    return (
        <div className="h-full flex flex-col md:gap-20 md:pt-10 pt-0 justify-center items-center md:w-120 w-full md:m-0 mb-10 mx-5 relative popUp">

            <div className="md:h-40 h-25 sm:w-100 md:w-140 w-70  overflow-hidden relative">
                <div className={`absolute ${voiceText.length >= 60 ? 'speech-text' : ' '} text-wrap bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent md:text-5xl text-3xl font-semibold`}>
                    {voiceText}
                </div>
            </div>

            <div className='md:m-0 mr-10'>
                <div className=' border-2 flex justify-center items-center p-3 rounded-full border-blue-800 bg-blue-800/40  '>
                    <div className=' border-2 flex justify-center items-center md:p-4 p-2 rounded-full border-blue-600 bg-blue-800/50  '>
                        <button
                            onClick={() => startListening()}
                            className="mic-home border-2 p-3 rounded-full border-blue-600 bg-blue-800/60 hover:bg-blue-800/80 cursor-pointer relative z-20"
                        >
                            <img className='h-auto md:w-18 w-14' src={mic} alt="mic" />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Speech
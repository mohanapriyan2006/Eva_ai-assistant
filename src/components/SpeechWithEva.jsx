import React, { useContext, useEffect } from 'react'
import { DataContext } from '../hooks/DataContext';
import '../styles/SpeechWithEva.css'
import MicButton from './loadings/MicButton';
import Listening from './loadings/Listening';
import Speaking from './loadings/Speaking';
import Thinking from './loadings/Thinking';



const Speech = () => {

    const { startListening, voiceText,
        isSpeak,
        isThink,
        isListen,
    } = useContext(DataContext)

    return (
        <div className="h-full flex flex-col md:gap-5 md:pt-10 pt-0 justify-center items-center md:w-120 w-full md:m-0 mb-10 mx-5 relative popUp">

            <div className="md:h-50 h-25 sm:w-100 md:w-140 w-70  overflow-hidden relative flex justify-center">
                {isListen && <Listening />}
                {isThink && <Thinking />}
                {(!isListen && !isThink) && <div className={`absolute ${voiceText.length >= 60? 'speech-text' : ' '} text-wrap bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent md:text-5xl text-3xl font-semibold`}>
                    {voiceText}
                </div>}
            </div>

            {!isSpeak && <MicButton />}
            {isSpeak && <Speaking />}

        </div>
    )
}

export default Speech

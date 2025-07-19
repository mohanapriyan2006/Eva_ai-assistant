import React, { useContext } from 'react'
import { DataContext } from '../hooks/DataContext';
import '../styles/SpeechWithEva.css'
import MicButton from './loadings/MicButton';
import Listening from './loadings/Listening';
import Speaking from './loadings/Speaking';
import Thinking from './loadings/Thinking';



const Speech = () => {

    const { voiceText,
        isSpeak,
        isThink,
        isListen,
    } = useContext(DataContext)

    return (
        <div className="h-full flex flex-col md:gap-5 md:pt-10 pt-0 justify-center items-center md:w-120 w-full md:m-0 mb-10 mx-5 relative popUp">

            <div className="md:h-50 h-25 sm:w-100 md:w-140 w-70 rounded-xl mr-10 md:mr-0
    border border-blue-500/50 overflow-hidden p-2 shadow-lg shadow-blue-400/20 hover:shadow-xl hover:shadow-blue-500/40 relative flex justify-center">
                {isListen && <Listening />}
                {isThink && <Thinking />}
                {(!isListen && !isThink) && (
                    <div className={`
                                absolute 
                                ${voiceText.length >= 60 ? 'speech-text' : ''} 
                                text-wrap 
                                md:text-3xl text-2xl 
                                font-semibold
                                p-2 md:p-8
                                animate-fade-in
                                max-w-4xl
                                leading-relaxed
                                tracking-wide
                                transition-all duration-300
                                hover:scale-[1.02]
                                
                            `}>
                        <div>
                            <span className="relative z-10 bg-gradient-to-r from-white via-blue-200 to-blue-400 
                                bg-clip-text  text-transparent">
                                {voiceText}
                            </span>
                            {voiceText && (
                                <span className="inline-block w-1 h-6 bg-blue-500 ml-1 animate-pulse"></span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {!isSpeak && <MicButton />}
            {isSpeak && <Speaking />}

        </div>
    )
}

export default Speech

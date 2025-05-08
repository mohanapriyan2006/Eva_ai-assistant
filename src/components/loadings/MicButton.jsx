import React, { useContext } from 'react'
import mic from '../../assets/mic.png'
import '../../styles/MicButton.css'

import { DataContext } from '../../hooks/DataContext'

const MicButton = () => {

    const { startListening, voiceText, isListen } = useContext(DataContext)


    return (
        <div className='md:m-0 mr-10 relative -mb-3'>

            {isListen && <div className="loader-btn w-30 h-30 relative top-30 -mt-25" >
            </div>}

            <div className=' border-2 flex justify-center items-center md:p-4 p-2 sm:py-4 py-2  rounded-full border-blue-600 bg-blue-800/50 '>
                <button
                    onClick={() => startListening()}
                    className="mic-home border-2 p-4  rounded-full border-blue-600 bg-blue-800/60 hover:bg-blue-800/80 cursor-pointer relative z-20"
                >
                    <img className={`h-12 w-12 ${isListen ? 'animate-pulse':''}`} src={mic} alt="mic" />
                </button>
            </div>
        </div>
    )
}

export default MicButton

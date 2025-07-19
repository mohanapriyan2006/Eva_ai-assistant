import React, { useContext } from 'react'
import infoI from '../assets/info.png'
import mic from '../assets/mic.png'
import chatI from '../assets/chat.png'
import { DataContext } from '../hooks/DataContext';

const Footer = () => {
    const { isChatActive, setIsChatActive, navigate, setInfo } = useContext(DataContext)

    return (
        <div className='flex flex-row  justify-between mx-10 md:-mt-16 '>
            <div className='flex gap-2 items-center text-[24px] sm:-mt-5'>
                <span
                    className=" border-2 p-2 rounded-full shadow-lg shadow-blue-400/20 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/80 border-blue-600 bg-blue-800/60 hover:bg-blue-800/80 cursor-pointer"
                    onClick={() => { navigate(isChatActive ? '/' : '/chat'); setIsChatActive(prev => !prev) }}
                >
                    <img className='h-auto md:w-12 w-10 ' src={isChatActive ? mic : chatI} alt="mic" />
                </span>
                <span className='sm:block hidden'>{isChatActive ? 'Speak' : 'Chat'} with <span className='logo text-3xl'>Eva</span></span>
            </div>
            <div className='flex gap-2 items-end text-[24px] mr-3 sm:-mt-5'>
                <span
                onClick={() => setInfo(prev => !prev)} 
                className=" border-2 p-3 rounded-full shadow-lg shadow-blue-400/20 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/80 border-blue-600 bg-blue-800/60 hover:bg-blue-800/80 cursor-pointer"
                >
                    <img className='h-auto md:w-10 w-8' src={infoI} alt="info" /></span> <span className='mb-3 sm:block hidden'>info</span>
            </div>
        </div>
    )
}

export default Footer
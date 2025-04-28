import React from 'react';
import '../../styles/Listening.css'

const Listening = () => {
    return (
        <div className='flex flex-col gap-2 sm:mt-10'>
            <div className="load mr-8">
                <div className="progress" />
                <div className="progress" />
                <div className="progress" />
            </div>
            <p className='text-center text-[20px] mr-5 text-gray-300'>Listening . . </p>
        </div>
    )
}

export default Listening;
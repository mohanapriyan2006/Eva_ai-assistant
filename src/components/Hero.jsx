import React from 'react'
import eva from '../assets/eva.png'


const Hero = () => {
    return (
        <div className="place-items-center sm:mt-5">
            <div className='text-center mb-4 sm:mr-15 mr-5'>
                <h1 className='logo text-4xl'>Eva</h1>
                <p className='font-medium'>Ai assistant</p>
            </div>
            <img className='md:h-120 h-70 w-auto' src={eva} alt="eva" />

        </div>
    )
}

export default Hero
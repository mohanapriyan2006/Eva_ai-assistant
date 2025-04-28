import React from 'react'
import eva from '../assets/eva.png'
import '../styles/Hero.css'


const Hero = () => {
    return (
        <div className="place-items-center sm:mt-5 mt-2">
            <div className='text-center mb-4 sm:mr-15 mr-5'>
                <h1 className='logo text-4xl'>Eva</h1>
                <p className='font-medium'>Ai assistant</p>
            </div>
            <div className='relative md:h-120 h-70 w-auto'>
                <img className='md:h-120 h-70 w-auto eva-animate' src={eva} alt="eva" />
            </div>

        </div>
    )
}

export default Hero
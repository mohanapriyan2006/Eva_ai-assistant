import React, { useContext } from 'react'
import eva from '../assets/evaWalle.png'
import { DataContext } from '../hooks/DataContext'


const Info = () => {
  const { info } = useContext(DataContext)

  return (
    <div className={`info-div absolute  ${info ? 'sm:right-50 right-0 scale-100 top-1' : 'right-0 top-60 scale-0'} z-100 sm:w-100 w-fit sm:m-0 mx-5 h-fit sm:p-4 p-3 flex flex-col gap-4 border-2 rounded-2xl border-blue-800 bg-blue-900/40 shadow-2xl transition-all`}>
      <div className='text-center'>
        <h1 className='logo text-2xl'>Eva</h1>
        <p className='font-medium'>Ai assistant</p>
      </div>
      <img className='md:h-20 h-15 w-auto m-auto' src={eva} alt="eva" />

      <div className='flex flex-col gap-3'>
        <h3 className='font-semibold'>Hello, Human! 🌟 Meet Eva — your intelligent companion for a smarter, simpler life.</h3>
        <p>Inspired by the spirit of exploration and care (just like EVA from WALL-E), Eva AI is designed to help you discover, create, and organize your world — one task, one conversation at a time.</p>
        <p>Built using the powerful Gemini AI technology, Eva blends cutting-edge intelligence with a touch of heart. She's fast, smart, and always evolving to understand you better.</p>
      </div>

      <h1>Developed/Designed by <a href='https://mohanapriyan.netlify.app' target='new' className='font-bold hover:underline hover:text-blue-300 cursor-pointer'>MOHANAPRIYAN M</a></h1>

    </div>
  )
}

export default Info
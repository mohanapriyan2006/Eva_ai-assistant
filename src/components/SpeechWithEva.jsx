import React, { useContext } from 'react'
import { DataContext } from '../hooks/DataContext'

const Speech = () => {

    const { speak, startListening } = useContext(DataContext)
    speak(' ');

    return (
        <div className="min-h-screen flex justify-center items-center">

            <button
                onClick={() => startListening()}
                className="w-40 h-20 border rounded bg-blue-600 text-white text-lg hover:bg-blue-700"
            >
                Tab to Speak
            </button>
            <button
                onClick={() => speak(`Hello , I AI assistant`)}
                className="w-40 h-20 border rounded bg-blue-600 text-white text-lg hover:bg-blue-700"
            >
                Hear
            </button>
        </div>
    )
}

export default Speech
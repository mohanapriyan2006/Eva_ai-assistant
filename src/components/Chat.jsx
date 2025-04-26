import React, { useContext } from 'react'
import { DataContext } from '../hooks/DataContext';

const Chat = () => {
  const { reply, setReply, prompt, setPrompt } = useContext(DataContext)

  return (
    <div className='place-content-center place-items-center h-dvh'>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className='border'
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button 
        className='border rounded bg-violet-400 hover:bg-violet-600' 
        type='submit'
        >send</button>
      </form>
    </div>
  )
}

export default Chat;
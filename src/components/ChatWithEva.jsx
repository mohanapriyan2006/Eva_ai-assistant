import React, { useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from '../hooks/DataContext';
import sendI from '../assets/send.png'
import ChatSpace from './ChatSpace';
import '../styles/ChatWithEva.css'

const Chat = () => {

  const { chat, prompt, setPrompt, handlePromptSend, isChatActive, setIsChatActive, navigate } = useContext(DataContext);

  const chatBoxRef = useRef()

  useEffect(() => {
    chatBoxRef.current.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: 'smooth' })
  }, [chat])


  return (
    <div className="parent h-dvh sm:h-140 bg-linear-to-b from-black to-blue-950 sm:my-4 sm:border-2 sm:border-blue-500 sm:rounded-[20px] sm:w-[380px] w-[full] relative popUp">

      <div className="chat-header flex justify-between items-center p-4">
        <span
          className="material-symbols-outlined cursor-pointer"
          onClick={() => { navigate(isChatActive ? '/' : '/chat'); setIsChatActive(prev => !prev) }}
        >arrow_back</span>
        <p className="text-center flex-1">Chat with <span className="logo font-semibold text-xl">Eva</span></p>
        <span
          className="material-symbols-outlined cursor-pointer"
        >more_horiz</span>
      </div>

      <div ref={chatBoxRef} className="chat-space scroll-bar px-4 py-6">
        {
          chat.map((item, id) => (
            <ChatSpace key={id} chat={item} />
          ))
        }
      </div>

      <form onSubmit={handlePromptSend} className="chat-form flex items-center  gap-2 p-4">
        <input
          className="flex-1 border-2 border-blue-800 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Type anything..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        {prompt.length ? <button
          className="border-2 rounded-full w-12 h-12 border-blue-500 bg-blue-600 absolute sm:right-5 right-2.5 cursor-pointer hover:bg-blue-700 transition"
          type="submit"
        >
          <img src={sendI} className="w-5 h-5 m-auto" alt="send" />
        </button>
          : null}
      </form>

    </div>

  )
}

export default Chat;
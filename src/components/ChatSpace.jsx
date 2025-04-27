import React, { useContext } from 'react';
import evaI from '../assets/evaI.png';

const ChatSpace = ({ chat }) => {

    return (
        <div className={`flex my-5 ${chat.role == 'user' ? 'justify-end' : ''}`}>
            {chat.role == 'model' && <img className='h-8 w-8 drop-shadow-lg drop-shadow-blue-500/80 ' src={evaI} alt="eva" />}
            <p className={`border w-fit max-w-[80%]  ${chat.role == 'user' ? 'bg-blue-900/25' : 'bg-blue-900/80'}  border-blue-600 p-2 rounded`}>{chat.text}</p>
        </div>
    )
}

export default ChatSpace
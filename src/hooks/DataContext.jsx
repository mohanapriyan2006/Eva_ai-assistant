import { createContext } from "react";
import { useEffect, useState } from 'react'
import gemini from './AiAPI';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [reply, setReply] = useState('welcome');
    const [prompt, setPrompt] = useState('');

    // --------------------
    // Speech functions

    // speak
    const speak = (text) => {
        const synth = window.speechSynthesis;
        synth.cancel();

        const utter = new SpeechSynthesisUtterance(text);
        const voices = synth.getVoices();

        const maleVoice = voices.find(voice =>
            voice.name.includes('Male') || voice.name.includes('Daniel') || voice.name.includes('Google UK English Male')
        );
        utter.voice = maleVoice;

        synth.speak(utter);
    };

    // voice listen
    const startListening = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
        recognition.lang = 'en-US';
        recognition.start();

        recognition.onresult = async (event) => {
            const transcript = event.results[0][0].transcript;
            setPrompt(transcript);
            const instruction = `Answer in a short way between 2 to 5 lines only. : ${transcript}`
            try {
                const res = await gemini(instruction);
                setReply(res);
                speak(res);
            } catch (err) {
                console.log("Error message : ", err);
                speak('Sorry, I could not understand.');
            }
        };

        recognition.onerror = (err) => console.error('Speech Recognition Error:', err);
    }

    // -------------------------------
    // chat functions





    return (
        <DataContext.Provider value={
            {
                prompt, setPrompt,
                reply, setReply,
                speak,
                startListening
            }
        }>
            {children}
        </DataContext.Provider>
    )
}

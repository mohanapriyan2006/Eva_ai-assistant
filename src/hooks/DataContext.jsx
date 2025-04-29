import { createContext, useEffect, useState } from "react";
import gemini from './aiAPI.js';
import { useLocation, useNavigate } from "react-router-dom";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    // navigate
    const curLoc = useLocation();
    const [isChatActive, setIsChatActive] = useState(
        () => {
            if (curLoc.pathname == '/chat') return true;
            else return false
        }
    );
    const navigate = useNavigate();

    const [info, setInfo] = useState(false)

    // --------------------
    // Speech functions
    const [voiceText, setVoiceText] = useState('Hello Sir, How Can I help you Today ?');

    const [isSpeak, setisSpeak] = useState(false)
    const [isThink, setIsThink] = useState(false)
    const [isListen, setisListen] = useState(false)

    const synth = window.speechSynthesis;
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    useEffect(() => {
        if (synth.onvoiceschanged !== undefined) {
            synth.onvoiceschanged = () => {
                synth.getVoices();
            };
        }
    }, [synth]);


    const speak = (text) => {
        if (!text) {
            console.error('Speak: No text provided!');
            return;
        }
        setIsThink(false)
        setisSpeak(true)
        const trySpeak = () => {
            const voices = synth.getVoices();
            if (!voices.length) {
                console.warn('Voices not loaded yet. Retrying...');
                setTimeout(trySpeak, 200); // retry after 200ms
                return;
            }

            const utter = new SpeechSynthesisUtterance(text);
            utter.rate = 1;
            utter.pitch = 1.2;
            utter.lang = "en-US";
            utter.volume = 1;

            const femaleVoice = voices.find(voice =>
                voice.name.includes('Female') ||
                voice.name.includes('Samantha') ||
                voice.name.includes('Google US English') ||
                voice.name.includes('Microsoft Zira') ||
                voice.name.includes('Jenny')
            );

            if (femaleVoice) {
                utter.voice = femaleVoice;
            }

            synth.speak(utter);
        };

        trySpeak();
    };

    useEffect(() => {
        setTimeout(() => setisSpeak(false), voiceText.length * 60)
    }, [isSpeak])


    useEffect(() => {
        speak(' ')
    }, [])

    const startListening = () => {
        setisListen(true);
        recognition.start();
        recognition.onresult = async (event) => {

            const transcript = event.results[0][0].transcript;
            setisListen(false);
            setIsThink(true)
            setVoiceText(transcript)
            const instruction = `instruction : 'Answer briefly and simple and note "avoid emojis then don't mention it"' : ${transcript}`;


            const history = [{ role: 'user', parts: [{ text: instruction }] },];

            try {
                const res = await gemini(history);
                console.log('Eva response:', res);
                setVoiceText(res)
                speak(res);


            } catch (err) {
                console.error('Error text:', err);
                setVoiceText('Sorry, Something went wrong !')
                speak('Sorry, Something went wrong !');
            }

            recognition.stop();
        };

        recognition.onerror = (err) => {
            console.error('Speech Recognition Error:', err);
            recognition.stop();
        };
    };

    // -------------------------------
    // chat functions


    const [prompt, setPrompt] = useState('')
    const [chat, setChat] = useState([]);


    const getResponseFromBot = async (currentChat) => {

        const updateChat = (res) => {
            setChat(prev => ([
                ...prev.filter(msg => msg.text !== 'Thinking...'),
                { role: 'model', text: res, isError: false }
            ]));
        }

        const history = currentChat.map(({ role, text }) => ({
            role,
            parts: [{ text }]
        }));

        try {
            const res = await gemini(history);
            if (!res || typeof res !== 'string') {
                throw new Error('Invalid response received');
            }
            updateChat(res);
        } catch (err) {
            console.error("Error in chat:", err);
            updateChat('Sorry, something went wrong.');
        }

    }

    const handlePromptSend = (e) => {
        e.preventDefault();

        const newUserMessage = { role: "user", text: prompt };
        setChat(prev => ([...prev, newUserMessage]));
        setPrompt('');
        setChat(prev => ([...prev, { role: "model", text: "Thinking..." }]));
        getResponseFromBot([...chat, newUserMessage]);
    }


    return (
        <DataContext.Provider value={{
            voiceText, setVoiceText,
            speak,
            startListening,
            isSpeak, setisSpeak,
            isThink, setIsThink,
            isListen, setisListen,
            chat, setChat,
            handlePromptSend,
            prompt, setPrompt,
            isChatActive, setIsChatActive, navigate,
            info, setInfo
        }}>
            {children}
        </DataContext.Provider>
    );
};

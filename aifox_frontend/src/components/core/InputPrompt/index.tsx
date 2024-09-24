import React, { useEffect, useRef, useState } from 'react';

import "./style.css";
import upload2 from "../../../assets/icons/upload2.png"
import { useDispatch, useSelector } from 'react-redux';
import { selectChatHistory } from '../../../store/selectors/chatSelector';
import { callConversationAPI } from '../../../services/conversation';
import { setChatHistory } from '../../../store/reducers/chatSlice';
import { useParams } from 'react-router-dom';
export interface ChatEntry {
    human: string,
    ai: string,
}
const InputPrompt = () => {
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [query, setQuery] = useState<string>("");
    const { document_id } = useParams();
    const chatHistory = useSelector(selectChatHistory);
    const dispatch = useDispatch();


    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.style.opacity = buttonDisabled ? '0.5' : '1';
            buttonRef.current.style.cursor = buttonDisabled ? 'initial' : 'pointer'
        }
    }, [buttonDisabled]);

    const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setButtonDisabled(e.target.value.trim().length == 0);
    }

    const handlePromptSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // await hitAPI(query);
        try {
            setButtonDisabled(true);
            event.preventDefault();
            dispatch(setChatHistory([...chatHistory, { "human": query }]));
            const prompt = query;
            setQuery("");

            console.log(document_id);
            console.log(prompt);
            const response = await callConversationAPI(document_id, prompt);
            // const response = "sd";
            console.log(response?.response);
            const chatEntry = {
                "human": query,
                "ai": response?.data.answer,
            };
            dispatch(setChatHistory([...chatHistory, chatEntry]));
            console.log([...chatHistory, chatEntry]);
        } catch (error) {
            const chatEntry = {
                "human": query,
                "ai": "I appreciate your inquiry, but I'm not in a position to respond to that specific question right now.",
            };

            dispatch(setChatHistory([...chatHistory, chatEntry]));
        }

    }


    return (
        <div className='input-prompt' >
            <form className="chat-input-container" onSubmit={(e) => handlePromptSubmit(e)}>
                <input
                    className="chat-input-textarea"
                    placeholder="Message FoxAI"
                    value={query}
                    onChange={(e) => handleInputValueChange(e)}
                />
                <button ref={buttonRef} className=' chat-input-send' disabled={buttonDisabled} >
                    <img src={upload2} className={`upload-icon ${buttonDisabled ? 'disabled-button' : 'show-button'}}`} />
                </button>
            </form>
            <div className="disclaimer-box">
                <p>FoxAI can make mistakes. Check important info.</p>
            </div>
        </div>
    )
}

export default InputPrompt;
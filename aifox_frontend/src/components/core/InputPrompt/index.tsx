import React, { useEffect, useRef, useState } from 'react';

import "./style.css";
import upload2 from "../../../assets/icons/upload2.png"
import { useDispatch, useSelector } from 'react-redux';
import { selectChatHistory } from '../../../store/selectors/chatSelector';
import { callConversationAPI } from '../../../services/conversation';
import { setChatHistory } from '../../../store/reducers/chatSlice';
export interface ChatEntry {
    Human: string,
    AI: string,
}
const InputPrompt = () => {
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [query, setQuery] = useState<string>("");

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
        event.preventDefault();
        dispatch(setChatHistory([...chatHistory, { "Human": query }]));
        setQuery("");
        const response = await callConversationAPI(query);
        // const response = "sd";
        console.log(response?.response);
        const chatEntry = {
            "Human": query,
            "AI": response?.response,
        };
        dispatch(setChatHistory([...chatHistory, chatEntry]));
        console.log([...chatHistory, chatEntry]);
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
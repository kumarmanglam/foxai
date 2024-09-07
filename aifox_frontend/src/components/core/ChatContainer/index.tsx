import React, { useEffect, useRef, useState } from 'react'
import "./style.css"

import { Tooltip } from 'react-tooltip';
import InputPrompt from '../InputPrompt';

import fox from "../../../assets/icons/fox.png";
import copy from "../../../assets/icons/copy.png";
import read_aloud from "../../../assets/icons/read_aloud.png";
import restart from "../../../assets/icons/restart.png";
import { useSelector } from 'react-redux';
import { selectChatHistory } from '../../../store/selectors/chatSelector';
import ReactMarkdown from "react-markdown";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from '../../common/CodeBlock';

const ChatContainer = () => {
    console.log("Jio")
    const scrollRef = useRef<HTMLDivElement>(null);
    const chatHistory = useSelector(selectChatHistory);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chatHistory])

    const handleCopyClick = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log("Copied to clipboard:", text);
                // You can add a success message or feedback for the user here
            })
            .catch((error) => {
                console.error("Failed to copy:", error);
            });
    };

    const handleReadAloudClick = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance); // Start reading the text aloud
    };

    return (
        <div className='chat-container'>
            <div className='chat-box'>
                {
                    chatHistory.length === 0 ?
                        <div className='chat-box-empty-logo'>
                            <img className='logo-inside-chatbox' src={fox} alt="" />
                            <p className='welcome-text'>Welcome! to <span>Fox AI</span></p></div> :
                        <div className='chat-log'>
                            {chatHistory.map((item: any, index: number) => {
                                return (
                                    <div key={index}>

                                        <div className='chat-message chat-human'>
                                            <div className='human-message'>{item["Human"]}</div>
                                        </div>
                                        {
                                            item["AI"]?.length == null ? null : <div className='chat-message chat-ai'>
                                                <div className='ai-avatar'><img src={fox} className='fox-icon' /></div>
                                                <div className='ai-response'>
                                                    <div className='ai-message'>
                                                        <Markdown
                                                            children={item["AI"]}
                                                            remarkPlugins={[remarkGfm]}
                                                            components={{
                                                                code: ({ node, inline, className, children, ...props }) => {
                                                                    const language = className?.replace('language-', '') || 'text';
                                                                    if (!inline && language) {
                                                                        return <CodeBlock value={String(children).replace(/\n$/, '')} language={language} />;
                                                                    }
                                                                    return <code className={className} {...props}>{children}</code>;
                                                                },
                                                            }}
                                                        /></div>
                                                    <div className='ai-actions'>
                                                        <a data-tooltip-id="tooltip-read-aloud" onClick={() => handleReadAloudClick(item["AI"])}>
                                                            <img src={read_aloud} className='action-icon' alt="Read Aloud" />
                                                        </a>
                                                        <Tooltip
                                                            id="tooltip-read-aloud"
                                                            content="Read Aloud"
                                                            place='bottom'
                                                        />
                                                        <a
                                                            data-tooltip-id="tooltip-copy"
                                                            onClick={() => handleCopyClick(item["AI"])} >
                                                            <img src={copy} className='action-icon' alt="Copy" />
                                                        </a>
                                                        <Tooltip
                                                            id="tooltip-copy"
                                                            content="Copy"
                                                            place='bottom'
                                                        />
                                                        {
                                                            chatHistory.length - 1 == index ? <div><a data-tooltip-id="tooltip-restart">
                                                                <img src={restart} className='action-icon' alt="Restart" />
                                                            </a>
                                                                <Tooltip
                                                                    id="tooltip-restart"
                                                                    content="Regenerate"
                                                                    place='bottom'
                                                                /></div> : null
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                            <div ref={scrollRef}></div>
                        </div>
                }
            </div>
            <div className='chat-input-prompt-box'>
                <InputPrompt />
            </div>
        </div>
    )
}

export default ChatContainer
/**
 *  scroll should happen when chat just started and should only happen once
 *  if answer is streaming or ended then scroll should not happen
 *  that means scroll should only happen once the count of streamed out is 1 or stream started anthing depending on BE response
 */
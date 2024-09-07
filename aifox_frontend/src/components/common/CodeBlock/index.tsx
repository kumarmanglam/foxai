// CodeBlock.js
import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';

// import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/hljs'; // For ES module

import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';



interface CodeBloackProp {
    value: any,
    language: any
}
const CodeBlock: React.FC<CodeBloackProp> = ({ value, language }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(value).then(() => {
            alert('Code copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy code: ', err);
        });
    };

    const style = {
        borderRadius: '5px',
        padding: '15px',
        backgroundColor: '#282c34',
        paddingTop: '40px'
    };
    return (
        <div style={{ position: 'relative', marginBottom: '16px' }}>
            <SyntaxHighlighter language={language} style={dark} customStyle={style}>
                {value}
            </SyntaxHighlighter>
            <button
                onClick={copyToClipboard}
                style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: '#1d1d1d',
                    color: 'grey',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                }}
            >
                Copy
            </button>
        </div>
    );
};

export default CodeBlock;

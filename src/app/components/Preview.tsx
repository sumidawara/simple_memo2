'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

type PreviewProps = {
    text: string;
};

export default function Preview({ text }: PreviewProps) {
    return (
        <div style={{ width: '100%', maxWidth: 600, padding: '1rem', overflowY: 'scroll' }}>
            <div className="markdown-preview" style={{ lineHeight: '1.6' }}>
                <ReactMarkdown>{text}</ReactMarkdown>
            </div>
        </div>
    );
}

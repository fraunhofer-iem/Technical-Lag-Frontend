import React from 'react';

type LegalNoticeProps = {
    title: string;
    text: string;
};

const LegalNotice: React.FC<LegalNoticeProps> = ({ title, text }) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    );
};

export default LegalNotice;
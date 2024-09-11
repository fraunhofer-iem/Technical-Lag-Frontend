import * as React from "react";
import {useState} from "react";
import "../body.css";
import {BodyStyles} from "../BodyStyles.tsx";

interface ButtonProps {
    text: string;
    action?: () => void;
}

const NewFileButton: React.FC<ButtonProps> = ({text, action}) => {
    const [isNFButtonHovered, setIsNFButtonHovered] = useState<boolean>(false);

    const newFileButtonStyle = {
        ...BodyStyles.newFileButton,
        backgroundColor: isNFButtonHovered ? 'var(--nfbtn-bg-hover)' : 'var(--nfbtn-bg)',
        color: isNFButtonHovered ? 'var(--nfbtn-txt-hover)' : 'var(--nfbtn-txt-color)',
        fontWeight: isNFButtonHovered ? 'bold' : 'normal',
    };

    return (
        <button
            type="button"
            style={newFileButtonStyle}
            onClick={action}
            onMouseEnter={() => setIsNFButtonHovered(true)}
            onMouseLeave={() => setIsNFButtonHovered(false)}
        >
            {text}
        </button>
    );
};

export default NewFileButton;

import * as React from "react";
import {useState} from "react";
import {BodyStyles} from "../BodyStyles.tsx";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

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
        <Fab
            aria-label="newfile"
            size="medium"
            style={newFileButtonStyle}
            onClick={action}
            onMouseEnter={() => setIsNFButtonHovered(true)}
            onMouseLeave={() => setIsNFButtonHovered(false)}
        >
            <AddIcon/>
            {text}
        </Fab >
    );
};

export default NewFileButton;

import * as React from "react";
import {useState} from "react";
import {BodyStyles} from "../BodyStyles.tsx";
import {Fab, useTheme} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

interface ButtonProps {
    text: string;
    action?: () => void;
}

const NewFileButton: React.FC<ButtonProps> = ({text, action}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const theme = useTheme();

    const newFileButtonStyle = {
        ...BodyStyles.newFileButton,
        backgroundColor: isHovered ? theme.palette.secondary.light : theme.palette.secondary.main,
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        fontWeight: isHovered ? 'bold' : 'normal',
        boxShadow: isHovered ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.2)',
    };

    return (
        <Fab
            aria-label="newfile"
            size="medium"
            style={newFileButtonStyle}
            onClick={action}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AddIcon/>
            {text}
        </Fab >
    );
};

export default NewFileButton;

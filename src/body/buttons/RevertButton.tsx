import * as React from "react";
import {useState} from "react";
import {BodyStyles} from "../BodyStyles.tsx";
import {ButtonProps} from "./buttonInterface.ts";
import {Fade, IconButton, Tooltip} from "@mui/material";
import BackspaceIcon from '@mui/icons-material/Backspace';


const RevertButton: React.FC<ButtonProps> = ({text, action, tooltip}) => {
    const [isRevButtonHovered, setIsRevButtonHovered] = useState<boolean>(false);

    const revButtonStyle = {
        ...BodyStyles.chartButton,
        backgroundColor: isRevButtonHovered ? 'var(--graphbtns-bg-hover)' : 'var(--graphbtns-bg)',
        color: isRevButtonHovered ? 'var(--graphbtns-txt-hover)' : 'var(--graphbtns-txt-color)',
    };

    return (
        <Tooltip title={tooltip} placement={"right"} arrow TransitionComponent={Fade} TransitionProps={{timeout: 600}}
                 PopperProps={{sx: {'& .MuiTooltip-tooltip': {padding: '10px', fontSize: "14px"},}}}>
            <IconButton
                style={revButtonStyle}
                size="medium"
                onClick={action}
                onMouseEnter={() => setIsRevButtonHovered(true)}
                onMouseLeave={() => setIsRevButtonHovered(false)}
            >
                {text}
                <BackspaceIcon/>
            </IconButton>
        </Tooltip>
    );
};

export default RevertButton;

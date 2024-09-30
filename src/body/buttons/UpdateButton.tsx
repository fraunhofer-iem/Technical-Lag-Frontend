import * as React from "react";
import {useState} from "react";
import {BodyStyles} from "../BodyStyles.tsx";
import {ButtonProps} from "./buttonInterface.ts";
import {Fade, IconButton, Tooltip} from "@mui/material";
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';

const UpdateButton: React.FC<ButtonProps> = ({text, action, tooltip}) => {
    const [isUDButtonHovered, setIsUDButtonHovered] = useState<boolean>(false);

    const updateButtonStyle = {
        ...BodyStyles.chartButton,
        backgroundColor: isUDButtonHovered ? 'var(--graphbtns-bg-hover)' : 'var(--graphbtns-bg)',
        color: isUDButtonHovered ? 'var(--graphbtns-txt-hover)' : 'var(--graphbtns-txt-color)',
    };

    return (
        <Tooltip title={tooltip} placement={"right"} arrow TransitionComponent={Fade} TransitionProps={{timeout: 600}}
                 PopperProps={{sx: {'& .MuiTooltip-tooltip': {padding: '10px', fontSize: "14px"},}}}>
            <IconButton
                style={updateButtonStyle}
                size="medium"
                onClick={action}
                onMouseEnter={() => setIsUDButtonHovered(true)}
                onMouseLeave={() => setIsUDButtonHovered(false)}
            >
                <TroubleshootIcon/>
                {text}
            </IconButton>
        </Tooltip>
    );
};

export default UpdateButton;

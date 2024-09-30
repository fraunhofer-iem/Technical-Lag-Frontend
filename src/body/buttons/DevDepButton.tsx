import * as React from "react";
import {useState} from "react";
import {BodyStyles} from "../BodyStyles.tsx";
import {ButtonProps} from "./buttonInterface.ts";
import {Button, Fade, Tooltip} from "@mui/material";
import AddchartIcon from '@mui/icons-material/Addchart';

const DevDepButton: React.FC<ButtonProps> = ({text, action, tooltip}) => {
    const [isDDButtonHovered, setIsDDButtonHovered] = useState<boolean>(false);

    const updateButtonStyle = {
        ...BodyStyles.chartButton,
        backgroundColor: isDDButtonHovered ? 'var(--graphbtns-bg-hover)' : 'var(--graphbtns-bg)',
        color: isDDButtonHovered ? 'var(--graphbtns-txt-hover)' : 'var(--graphbtns-txt-color)',
    };

    return (
        <Tooltip title={tooltip} placement={"right"} arrow TransitionComponent={Fade} TransitionProps={{timeout: 600}}
                 PopperProps={{sx: {'& .MuiTooltip-tooltip': {padding: '10px', fontSize: "14px"},}}}>
            <Button
                style={updateButtonStyle}
                size="medium"
                onClick={action}
                onMouseEnter={() => setIsDDButtonHovered(true)}
                onMouseLeave={() => setIsDDButtonHovered(false)}
            >
                <AddchartIcon/>
                {text}
            </Button>
        </Tooltip>
    );
};
export default DevDepButton;

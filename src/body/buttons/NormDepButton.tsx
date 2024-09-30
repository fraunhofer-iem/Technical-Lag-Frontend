import * as React from "react";
import {useState} from "react";
import {BodyStyles} from "../BodyStyles.tsx";
import {ButtonProps} from "./buttonInterface.ts";
import {Button, Fade, Tooltip} from "@mui/material";
import AddchartIcon from "@mui/icons-material/Addchart";

const NormDepButton: React.FC<ButtonProps> = ({text, action, tooltip}) => {
    const [isNDButtonHovered, setIsNDButtonHovered] = useState<boolean>(false);

    const updateButtonStyle = {
        ...BodyStyles.chartButton,
        backgroundColor: isNDButtonHovered ? 'var(--graphbtns-bg-hover)' : 'var(--graphbtns-bg)',
        color: isNDButtonHovered ? 'var(--graphbtns-txt-hover)' : 'var(--graphbtns-txt-color)',
        fontWeight: isNDButtonHovered ? 'bold' : 'normal',
    };

    return (
        <Tooltip title={tooltip} placement={"right"} arrow TransitionComponent={Fade} TransitionProps={{timeout: 600}}
                 PopperProps={{sx: {'& .MuiTooltip-tooltip': {padding: '10px', fontSize: "14px"},}}}>
            <Button
                style={updateButtonStyle}
                size="medium"
                variant="contained"
                onClick={action}
                onMouseEnter={() => setIsNDButtonHovered(true)}
                onMouseLeave={() => setIsNDButtonHovered(false)}
            >
                <AddchartIcon/>
                {text}
            </Button>
        </Tooltip>
    );
};
export default NormDepButton;

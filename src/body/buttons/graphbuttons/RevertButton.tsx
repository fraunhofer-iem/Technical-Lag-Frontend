import * as React from "react";
import {useState} from "react";
import {BodyStyles} from "../../BodyStyles.tsx";
import {ButtonProps} from "../buttonInterface.ts";
import {Button, Fade, Tooltip, useTheme} from "@mui/material";
import BackspaceIcon from '@mui/icons-material/Backspace';


const RevertButton: React.FC<ButtonProps> = ({text, action, tooltip}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const theme = useTheme();

    const revButtonStyle = {
        ...BodyStyles.chartButton,
        backgroundColor: isHovered ? theme.palette.primary.light : theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    };

    return (
        <Tooltip title={tooltip} placement={"right"} arrow TransitionComponent={Fade} TransitionProps={{timeout: 600}}
                 PopperProps={{sx: {'& .MuiTooltip-tooltip': {padding: '10px', fontSize: "14px"},}}}>
            <Button
                style={revButtonStyle}
                size="medium"
                variant="contained"
                onClick={action}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {text}
                <BackspaceIcon/>
            </Button>
        </Tooltip>
    );
};

export default RevertButton;

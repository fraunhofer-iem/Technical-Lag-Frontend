import * as React from "react";
import {useState} from "react";
import {ButtonProps} from "../buttonInterface.ts";
import {Button, Fade, Tooltip, useTheme} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import UpdateWindowStyles from "../../chart/library_update_and_revert/UpdateWindowStyles.ts";
import {ThemeProviderComponent} from "../../../themes_and_colors/ThemeContext.tsx";

const CloseButton: React.FC<ButtonProps> = ({text, action, tooltip}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const theme = useTheme();

    const closeButtonStyle = {
        ...UpdateWindowStyles.closeButton,
        backgroundColor: isHovered ? theme.palette.primary.light : theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    };

    return (
        <ThemeProviderComponent>
            <Tooltip title={tooltip} placement={"left"} arrow TransitionComponent={Fade}
                     TransitionProps={{timeout: 600}}
                     PopperProps={{sx: {'& .MuiTooltip-tooltip': {padding: '10px', fontSize: "14px"},}}}>
                <Button
                    style={closeButtonStyle}
                    size="medium"
                    variant="contained"
                    onClick={action}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <CloseIcon/>
                    {text}
                </Button>
            </Tooltip>
        </ThemeProviderComponent>
    );
};

export default CloseButton;

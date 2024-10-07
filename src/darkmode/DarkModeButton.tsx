import React, {useEffect, useState} from "react";
import {DarkModeButtonStyles} from "./DarkModeButtonStyles.tsx";
import {Fade, IconButton, Tooltip} from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {useTheme} from './ThemeContext';


const DarkModeButton: React.FC = () => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const {toggleTheme, mode} = useTheme();

    // Toggle dark mode
    const handleToggleDarkMode = () => {
        toggleTheme();
    };

    return (
        <Tooltip title={mode === 'dark' ? "Light it up!" : "Vampire Mode"} placement={"bottom"} arrow
                 TransitionComponent={Fade}
                 TransitionProps={{timeout: 600}}
                 PopperProps={{sx: {'& .MuiTooltip-tooltip': {padding: '8px', fontSize: "12px"},}}}>
            <IconButton
/*                style={darkModeButtonStyle}*/ //TODO
                onClick={handleToggleDarkMode}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                sx={{ //TODO
/*                    backgroundColor: isHovered ? 'var(--btn-bg-hover)' : 'var(--btn-bg)',  // Background color on hover
                    color: isHovered ? 'var(--btn-hover-txt-color)' : 'var(--btn-txt-color)',  // Text color on hover*/
                }}
            >
                {mode === 'dark' ? <DarkModeIcon style={DarkModeButtonStyles.icon}/> :
                    <LightModeIcon style={DarkModeButtonStyles.icon}/>}
            </IconButton>
        </Tooltip>
    );
}

export default DarkModeButton;

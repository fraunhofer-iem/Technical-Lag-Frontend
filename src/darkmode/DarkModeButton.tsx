import React, {useEffect, useState} from "react";
import {DarkModeButtonStyles} from "./DarkModeButtonStyles.tsx";
import {Fade, IconButton, Tooltip} from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const DarkModeButton: React.FC = () => {
    const [isDMButtonHovered, setIsDMButtonHovered] = useState<boolean>(false);
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const darkModeButtonStyle = {
        ...DarkModeButtonStyles.darkModeButton,
        backgroundColor: isDMButtonHovered ? 'var(--btn-bg-hover)' : 'var(--btn-bg)',
        color: isDMButtonHovered ? 'var(--btn-hover-txt-color)' : 'var(--btn-txt-color)',
        fontWeight: isDMButtonHovered ? 'bold' : 'normal',
    };

    // Apply the theme to the body element
    useEffect(() => {
        const modeClass = darkMode ? 'dark-mode' : 'light-mode';
        document.body.classList.remove('dark-mode', 'light-mode');
        document.body.classList.add(modeClass);
        localStorage.setItem('theme', modeClass);
    }, [darkMode]);

    // Retrieve the user's theme preference from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setDarkMode(savedTheme === 'dark-mode');
        }
    }, []);


    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Tooltip title={darkMode ? "Light it up!" : "Darken"} placement={"bottom"} arrow TransitionComponent={Fade}
                 TransitionProps={{timeout: 600}}
                 PopperProps={{sx: {'& .MuiTooltip-tooltip': {padding: '8px', fontSize: "12px"},}}}>
            <IconButton
                style={darkModeButtonStyle}
                onClick={toggleDarkMode}
                onMouseEnter={() => setIsDMButtonHovered(true)}
                onMouseLeave={() => setIsDMButtonHovered(false)}
            >
                {darkMode ? <LightModeIcon style={DarkModeButtonStyles.icon}/> :
                    <DarkModeIcon style={DarkModeButtonStyles.icon}/>}
            </IconButton>
        </Tooltip>
    );
}

export default DarkModeButton;

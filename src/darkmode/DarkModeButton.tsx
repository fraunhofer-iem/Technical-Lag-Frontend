import React, {useEffect, useState} from "react";
import {DarkModeButtonStyles} from "./DarkModeButtonStyles.tsx";

const DarkModeButton: React.FC = () => {
    const [isDMButtonHovered, setIsDMButtonHovered] = useState<boolean>(false);
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const darkModeButtonStyle = {
        ...DarkModeButtonStyles.darkModeButton,
        backgroundColor: isDMButtonHovered ? 'var(--button-hover-background)' : 'var(--button-background)',
        color: isDMButtonHovered ? 'var(--button-hover-text-color)' : 'var(--button-text-color)',
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

    return (<button style={darkModeButtonStyle} onClick={toggleDarkMode}
                    onMouseEnter={() => setIsDMButtonHovered(true)}
                    onMouseLeave={() => setIsDMButtonHovered(false)}>
            Switch to {darkMode ? 'Light' : 'Dark'} Mode
        </button>
    );
}

export default DarkModeButton;

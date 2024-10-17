import React, {useState} from "react";
import {DarkModeButtonStyles} from "./DarkModeButtonStyles.tsx";
import {Button, Fade, Tooltip, useTheme} from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {useSelectedTheme} from './ThemeContext';

const DarkModeButton: React.FC = () => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const {toggleTheme, mode} = useSelectedTheme();
    const theme = useTheme();

    // Toggle dark mode
    const handleToggleDarkMode = () => {
        toggleTheme();
    };

    return (
        <Tooltip title={mode === 'dark' ? "Light it up!" : "Vampire Mode"} placement={"bottom"} arrow
                 TransitionComponent={Fade}
                 TransitionProps={{timeout: 600}}
                 PopperProps={{sx: {'& .MuiTooltip-tooltip': {padding: '8px', fontSize: "12px"},}}}>
            <Button
                onClick={handleToggleDarkMode}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                size="small"
                variant="contained"
                sx={{
                    backgroundColor: isHovered ? theme.palette.primary.light : theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    fontWeight: isHovered ? 'bold' : 'normal',
                }}
            >
                {mode === 'dark' ? <DarkModeIcon style={DarkModeButtonStyles.icon}/> :
                    <LightModeIcon style={DarkModeButtonStyles.icon}/>}
            </Button>
        </Tooltip>
    );
}

export default DarkModeButton;

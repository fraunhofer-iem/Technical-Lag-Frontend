import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {HelpButtonStyles} from './HelpButtonStyles';
import {faQuestion} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Fade, Tooltip, useTheme} from "@mui/material";

const HelpButton: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const theme = useTheme();

    const handleHelpClick = () => {
        navigate('/help');
    };

    // Exclude the HelpButton from footer pages and the helppage itself
    if (location.pathname === '/terms-of-service' || location.pathname === '/privacy-policy' || location.pathname === '/help') {
        return null;
    }

    return (
        <Tooltip title={"Need Help? Click me!"} placement={"bottom"} arrow TransitionComponent={Fade}
                 TransitionProps={{timeout: 600}}
                 PopperProps={{sx: {'& .MuiTooltip-tooltip': {padding: '8px', fontSize: "12px"},}}}>
            <Button
                onClick={handleHelpClick}
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
                <FontAwesomeIcon icon={faQuestion} style={HelpButtonStyles.icon}/>
            </Button>
        </Tooltip>
    );
};

export default HelpButton;

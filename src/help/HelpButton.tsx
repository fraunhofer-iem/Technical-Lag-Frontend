import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {HelpButtonStyles} from './HelpButtonStyles';
import {faQuestion} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Fade, IconButton, Tooltip} from "@mui/material";

const HelpButton: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleHelpClick = () => {
        navigate('/help');
    };

    // Exclude the HelpButton from footer pages and the helppage itself
    if (location.pathname === '/terms-of-service' || location.pathname === '/privacy-policy' || location.pathname === '/help') {
        return null;
    }

    return (
        <Tooltip title={"Need Help? Click me!"} placement={"bottom"} arrow TransitionComponent={Fade} TransitionProps={{timeout: 600}}
                 PopperProps={{sx: {'& .MuiTooltip-tooltip': {padding: '8px', fontSize: "12px"},}}}>
            <IconButton
                /*style={helpButtonStyle}*/ //TODO
                onClick={handleHelpClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                sx={{ //TODO
/*                    backgroundColor: isHovered ? 'var(--btn-bg-hover)' : 'var(--btn-bg)',  // Background color on hover
                    color: isHovered ? 'var(--btn-hover-txt-color)' : 'var(--btn-txt-color)',  // Text color on hover*/
                }}
            >
                <FontAwesomeIcon icon={faQuestion} style={HelpButtonStyles.icon}/>
            </IconButton>
        </Tooltip>
    );
};

export default HelpButton;

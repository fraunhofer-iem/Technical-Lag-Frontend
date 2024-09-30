import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {HelpButtonStyles} from './HelpButtonStyles';
import {faQuestion} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Fade, Tooltip} from "@mui/material";

const HelpButton: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isHelpButtonHovered, setIsHelpButtonHovered] = useState<boolean>(false);

    const helpButtonStyle = {
        ...HelpButtonStyles.button,
        backgroundColor: isHelpButtonHovered ? 'var(--btn-bg-hover)' : 'var(--btn-bg)',
        color: isHelpButtonHovered ? 'var(--btn-hover-txt-color)' : 'var(--btn-txt-color)',
        fontWeight: isHelpButtonHovered ? 'bold' : 'normal',
    };

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
            <Button
                style={helpButtonStyle} //TODO
                onClick={handleHelpClick}
                onMouseEnter={() => setIsHelpButtonHovered(true)}
                onMouseLeave={() => setIsHelpButtonHovered(false)}
            >
                <FontAwesomeIcon icon={faQuestion} style={HelpButtonStyles.icon}/>
            </Button>
        </Tooltip>
    );
};

export default HelpButton;

import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'; // Updated to use useNavigate for React Router v6
import {WelcomePageStyles} from "./WelcomePageStyles";
import {Button, Typography, useTheme} from "@mui/material";


const WelcomePage: React.FC = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const theme = useTheme();

    const handleClick = () => {
        navigate('/drag-n-drop');
    };

    // Define button styles based on hover state
    const getStartedButtonStyle = {
        ...WelcomePageStyles.getStartedButton,
        backgroundColor: isHovered ? theme.palette.secondary.light : theme.palette.secondary.main,
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        fontWeight: isHovered ? 'bold' : 'normal',
        boxShadow: isHovered ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.2)',
    };

    return (
        <div style={WelcomePageStyles.container}>
            <Typography variant={"h1"} gutterBottom style={WelcomePageStyles.title}>Technical Lag Analyzer</Typography>
            <Typography style={WelcomePageStyles.description}>
                This tool helps with analysing the technical lag to all of your projects in a user friendly way. It's
                designed to improve your workflow and make your life easier.
                LibYear Analyzer displays your project structure in a dependency tree to better visualise the areas of
                improvement.
                Get started by clicking the button below!
            </Typography>
            <Button variant="contained" size="large" style={getStartedButtonStyle} onClick={handleClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                Get Started
            </Button>
        </div>
    );
};

export default WelcomePage;

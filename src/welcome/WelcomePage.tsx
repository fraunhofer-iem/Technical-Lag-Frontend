import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'; // Updated to use useNavigate for React Router v6
import {WelcomePageStyles} from "./WelcomePageStyles";
import {Button, Typography} from "@mui/material";


const WelcomePage: React.FC = () => {
    const navigate = useNavigate();
    const [isStartButtonHovered, setIsStartButtonHovered] = useState<boolean>(false);

    const handleClick = () => {
        navigate('/drag-n-drop');
    };

    // Define button styles based on hover state
    const getStartedButtonStyle = {
        ...WelcomePageStyles.getStartedButton,
        backgroundColor: isStartButtonHovered ? 'var(--btn-bg-hover)' : 'var(--btn-bg)',
        color: isStartButtonHovered ? 'var(--btn-txt-hover)' : 'var(--btn-txt-color)',
        fontWeight: isStartButtonHovered ? 'bold' : 'normal',
    };

    return (
        <div style={WelcomePageStyles.container}>
            <Typography variant={"h1"} color="primary" gutterBottom style={WelcomePageStyles.title}>Technical Lag Analyzer</Typography>
            <Typography style={WelcomePageStyles.description}>
                This tool helps with analysing the technical lag to all of your projects in a user friendly way. It's
                designed to improve your workflow and make your life easier.
                LibYear Analyzer displays your project structure in a dependency tree to better visualise the areas of
                improvement.
                Get started by clicking the button below!
            </Typography>
            <Button variant="contained" size="large" style={getStartedButtonStyle} onClick={handleClick}
                    onMouseEnter={() => setIsStartButtonHovered(true)}
                    onMouseLeave={() => setIsStartButtonHovered(false)}>
                Get Started
            </Button>
        </div>
    );
};

export default WelcomePage;

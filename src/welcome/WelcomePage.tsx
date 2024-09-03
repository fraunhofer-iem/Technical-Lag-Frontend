import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'; // Updated to use useNavigate for React Router v6
import StickyNoteComponent from "../footer/stickynote/StickyNoteComponent.tsx";
import {WelcomePageStyles} from "./WelcomePageStyles";


const WelcomePage: React.FC = () => {
    const navigate = useNavigate();
    const [isStartButtonHovered, setIsStartButtonHovered] = useState<boolean>(false);

    const handleClick = () => {
        navigate('/drag-n-drop');
    };

    // Define button styles based on hover state
    const getStartedButtonStyle = {
        ...WelcomePageStyles.getStartedButton,
        backgroundColor: isStartButtonHovered ? 'var(--button-hover-background)' : 'var(--button-background)',
        color: isStartButtonHovered ? 'var(--button-hover-text-color)' : 'var(--button-text-color)',
        fontWeight: isStartButtonHovered ? 'bold' : 'normal',
    };

    return (
        <div style={WelcomePageStyles.container}>
            <h1 style={WelcomePageStyles.title}>Technical Lag Analyzer</h1>
            <p style={WelcomePageStyles.description}>
                This tool helps with analysing the technical lag to all of your projects in a user friendly way. It's
                designed to improve your workflow and make your life easier.
                LibYear Analyzer displays your project structure in a dependency tree to better visualise the areas of
                improvement.
                Get started by clicking the button below!
            </p>
            <button style={getStartedButtonStyle} onClick={handleClick}
                    onMouseEnter={() => setIsStartButtonHovered(true)}
                    onMouseLeave={() => setIsStartButtonHovered(false)}>
                Get Started
            </button>
            <StickyNoteComponent/>
        </div>
    );
};

export default WelcomePage;

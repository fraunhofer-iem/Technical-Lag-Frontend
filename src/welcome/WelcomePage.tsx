import React from 'react';
import { useNavigate } from 'react-router-dom'; // Updated to use useNavigate for React Router v6
import StickyNoteComponent from "../footer/stickynote/StickyNoteComponent.tsx";
import { WelcomePageStyles } from "./WelcomePageStyles";


const WelcomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/drag-n-drop'); // Change '/next-page' to the path you want to navigate to
    };

    return (
        <div style={WelcomePageStyles.container}>
            <h1 style={WelcomePageStyles.title}>LibYear Analyzer</h1>
            <p style={WelcomePageStyles.description}>
                This tool helps with analysing the technical lag to all of your projects in a user friendly way. It's designed to improve your workflow and make your life easier.
                LibYear Analyzer displays your project structure in a dependency tree to better visualise the areas of improvement.
                Get started by clicking the button below!
            </p>
            <button style={WelcomePageStyles.getStartedButton} onClick={handleClick}>
                Get Started
            </button>
            <StickyNoteComponent />
        </div>
    );
};

export default WelcomePage;

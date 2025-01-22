import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {WelcomePageStyles} from './WelcomePageStyles';
import {Button, Typography, useTheme} from '@mui/material';
import ParticlesTheme from "../themes_and_colors/ParticlesTheme.tsx";

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
                {/* Animated Particles Background */}
                <ParticlesTheme/>

                {/* Title */}
                <Typography variant="h1" gutterBottom style={WelcomePageStyles.title}>
                    Technical Lag Analyzer
                </Typography>

                {/* Description */}
                <Typography style={WelcomePageStyles.description}>
                    This tool helps with analyzing the technical lag in all of your projects in a user-friendly way.
                    It's
                    designed to improve your workflow and make your life easier. LibYear Analyzer displays your project
                    structure in a dependency tree to better visualize the areas of improvement. Get started by clicking
                    the
                    button below!
                </Typography>

                {/* Get Started Button */}
                <Button
                    variant="contained"
                    size="large"
                    style={getStartedButtonStyle}
                    onClick={handleClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Get Started
                </Button>

                {/* A small footer */}
                <Typography variant="body2" style={WelcomePageStyles.footer}>
                    &copy; 2025 Technical Lag Analyzer. All rights reserved.
                </Typography>
            </div>
    );
};

export default WelcomePage;

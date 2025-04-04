import React, {useCallback} from "react";
import Particles from 'react-tsparticles';
import type {Container, Engine, IOutModes} from "tsparticles-engine";
import {useTheme} from '@mui/material/styles';
import {loadSlim} from "tsparticles-slim";
import {ThemeProviderComponent} from "./ThemeContext.tsx";

const ParticlesTheme: React.FC = () => {
    const theme = useTheme();

    const particlesConfig = {
        background: {
            color: {
                value: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
            },
        },
        fpsLimit: 60,
        particles: {
            color: {
                value: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
            },
            links: {
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            move: {
                enable: true,
                outModes: { default: "bounce" } as IOutModes,
                random: false,
                speed: 0.5,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            size: {
                value: {min: 1, max: 3},
            },
        },
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        detectRetina: true,
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "triangle",
        },
    };

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        await console.log(container);
    }, []);

    return (
        <ThemeProviderComponent>
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={particlesConfig}
                loaded={particlesLoaded}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                }}
            />
        </ThemeProviderComponent>
    );
};

export default ParticlesTheme;

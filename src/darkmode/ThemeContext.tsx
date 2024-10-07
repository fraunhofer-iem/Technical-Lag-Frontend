import React, {createContext, useContext, useEffect, useState} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    toggleTheme: () => void;
    mode: ThemeMode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderComponent: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [mode, setMode] = useState<ThemeMode>('light');  // Default to 'light'

    // Load theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setMode(savedTheme === 'dark-mode' ? 'dark' : 'light');
        }
    }, []);  // Only run once on mount

    // Function to toggle the theme and store it in localStorage
    const toggleTheme = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newMode === 'dark' ? 'dark-mode' : 'light-mode');
            return newMode;
        });
    };

    //TODO Change colors
    const theme = createTheme({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    primary: {
                        light: '#66b3a5',     // Lighter variant of teal primary color
                        main: '#34a19d',      // Main primary color (teal)
                        dark: '#00796b',      // Darker variant of teal primary color
                        contrastText: '#ffffff', // White text color on primary backgrounds
                    },
                    secondary: {
                        light: '#ff5983',     // Light variant of secondary color (pink)
                        main: '#f50057',      // Main secondary color
                        dark: '#bb002f',      // Dark variant of secondary color
                        contrastText: '#ffffff', // Text color on secondary backgrounds
                    },
                    error: {
                        light: '#e57373',
                        main: '#f44336',
                        dark: '#d32f2f',
                        contrastText: '#ffffff',
                    },
                    warning: {
                        light: '#ffb74d',
                        main: '#ff9800',
                        dark: '#f57c00',
                        contrastText: '#ffffff',
                    },
                    info: {
                        light: '#64b5f6',
                        main: '#2196f3',
                        dark: '#1976d2',
                        contrastText: '#ffffff',
                    },
                    success: {
                        light: '#81c784',
                        main: '#4caf50',
                        dark: '#388e3c',
                        contrastText: '#ffffff',
                    },
                    text: {
                        primary: '#212121',
                        secondary: '#757575',
                        disabled: '#bdbdbd',
                    },
                    background: {
                        default: '#fafafa',
                        paper: '#ffffff',
                    },
                    action: {
                        active: '#001e3c',
                        hover: 'rgba(0, 30, 60, 0.08)',
                        selected: 'rgba(0, 30, 60, 0.16)',
                        disabled: '#bdbdbd',
                        disabledBackground: '#e0e0e0',
                    },
                }
                : {
                    primary: {
                        light: '#64b5f6',     // Light variant of blue primary color
                        main: '#2196f3',      // Main primary color (blue)
                        dark: '#1976d2',      // Dark variant of blue primary color
                        contrastText: '#ffffff', // White text color on primary backgrounds
                    },
                    secondary: {
                        light: '#ff6090',
                        main: '#f50057',       // Keeping secondary color the same
                        dark: '#ab003c',
                        contrastText: '#ffffff', // White text on secondary backgrounds
                    },
                    error: {
                        light: '#ef5350',
                        main: '#f44336',
                        dark: '#c62828',
                        contrastText: '#ffffff',
                    },
                    warning: {
                        light: '#ffb74d',
                        main: '#ff9800',
                        dark: '#f57c00',
                        contrastText: '#000000', // Black text on warning backgrounds
                    },
                    info: {
                        light: '#64b5f6',
                        main: '#2196f3',
                        dark: '#0b79d0',
                        contrastText: '#ffffff',
                    },
                    success: {
                        light: '#66bb6a',
                        main: '#4caf50',
                        dark: '#2e7d32',
                        contrastText: '#ffffff',
                    },
                    text: {
                        primary: '#ffffff',      // Primary text should be white for contrast
                        secondary: '#b0bec5',    // Lighter secondary text for dark backgrounds
                        disabled: '#757575',     // Slightly lighter than in light mode
                    },
                    background: {
                        default: '#121212',      // Dark background for the app
                        paper: '#1e1e1e',        // Darker paper element background
                    },
                    action: {
                        active: '#ffffff',       // White icons or active elements
                        hover: 'rgba(255, 255, 255, 0.08)', // Subtle hover effect
                        selected: 'rgba(255, 255, 255, 0.16)', // Selection state
                        disabled: '#757575',     // Disabled action colors
                        disabledBackground: '#424242', // Disabled backgrounds should be darker
                    }
                }),
        },
    });

    return (
        <ThemeContext.Provider value={{toggleTheme, mode}}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

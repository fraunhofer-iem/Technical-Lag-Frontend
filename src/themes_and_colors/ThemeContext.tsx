import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    toggleTheme: () => void;
    mode: ThemeMode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderComponent: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [mode, setMode] = useState<ThemeMode>('light');

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

    const contextValue = useMemo(() => ({ toggleTheme, mode }), [toggleTheme, mode]);


    //TODO Change colors
    const theme = createTheme({
        palette: {
            mode,
            ...(mode === 'light'
                ? {
                    primary: {
                        light: '#66b3a5',
                        main: '#34a19d',
                        dark: '#00796b',
                        contrastText: '#ffffff',
                    },
                    secondary: {
                        light: '#ff5983',
                        main: '#f50057',
                        dark: '#bb002f',
                        contrastText: '#ffffff',
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
                        light: '#64b5f6',
                        main: '#2196f3',
                        dark: '#1976d2',
                        contrastText: '#ffffff',
                    },
                    secondary: {
                        light: '#ff6090',
                        main: '#f50057',
                        dark: '#ab003c',
                        contrastText: '#ffffff',
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
                        contrastText: '#000000',
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
                        primary: '#ffffff',
                        secondary: '#b0bec5',
                        disabled: '#757575',
                    },
                    background: {
                        default: '#121212',
                        paper: '#1e1e1e',
                    },
                    action: {
                        active: '#ffffff',
                        hover: 'rgba(255, 255, 255, 0.08)',
                        selected: 'rgba(255, 255, 255, 0.16)',
                        disabled: '#757575',
                        disabledBackground: '#424242',
                    }
                }),
        },
    });

    return (
        <ThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useSelectedTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

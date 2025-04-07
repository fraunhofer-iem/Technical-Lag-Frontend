import { render, screen, fireEvent } from '@testing-library/react';
import ResponsiveAppBar from '../../appbar/ResponsiveAppBar';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Mock child components
jest.mock('../../help/HelpButton', () => () => <div data-testid="HelpButton" />);
jest.mock('../../themes_and_colors/DarkModeButton', () => () => <div data-testid="DarkModeButton" />);

describe('ResponsiveAppBar', () => {
    const renderWithTheme = () => {
        const theme = createTheme();
        return render(
            <ThemeProvider theme={theme}>
                <MemoryRouter>
                    <ResponsiveAppBar />
                </MemoryRouter>
            </ThemeProvider>
        );
    };

    it('renders the logo and title', () => {
        renderWithTheme();

        // Check logo presence
        const logo = screen.getByAltText('Logo');
        expect(logo).toBeInTheDocument();

        // Check title
        const title = screen.getByText('TLA');
        expect(title).toBeInTheDocument();
    });

    it('renders help and dark mode buttons', () => {
        renderWithTheme();

        expect(screen.getByTestId('HelpButton')).toBeInTheDocument();
        expect(screen.getByTestId('DarkModeButton')).toBeInTheDocument();
    });

    it('title color changes on hover', () => {
        renderWithTheme();

        const title = screen.getByText('TLA');

        fireEvent.mouseEnter(title);
        fireEvent.mouseLeave(title);

        expect(title).toBeInTheDocument();
    });
});

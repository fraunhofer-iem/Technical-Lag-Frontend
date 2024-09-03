export const DarkModeButtonStyles = {
    darkModeButton: {
        position: 'absolute' as const,
        top: '20px',
        right: '20px',
        padding: '10px 20px',
        fontSize: '1rem',
        color: 'var(--button-text-color)',
        backgroundColor: 'var(--button-background)',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
};

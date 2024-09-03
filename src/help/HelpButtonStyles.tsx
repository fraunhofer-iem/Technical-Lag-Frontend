export const HelpButtonStyles = {
    button: {
        position: 'fixed' as const,
        top: '10px',
        left: '10px',
        padding: '15px',
        border: 'none',
        borderRadius: '30%',
        cursor: 'pointer',
        zIndex: 1000,
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    icon: {
        fontSize: '1rem',
    },
    buttonContainer: {
        position: 'relative' as const, // Ensures tooltip is positioned relative to button
        display: 'inline-block',
    },
};

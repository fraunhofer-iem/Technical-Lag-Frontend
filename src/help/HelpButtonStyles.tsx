export const HelpButtonStyles = {
    button: {
        position: 'fixed' as const,
        top: '10px',
        left: '10px',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        zIndex: 1000,
        transition: 'background-color 0.6s ease, color 0.3s ease',
    },
    icon: {
        fontSize: '0.8rem',
    },
    buttonContainer: {
        position: 'relative' as const,
        zIndex: 1000,
        background: "none",
        border: "none",
        padding: "0",
        width: '0',
    },
};

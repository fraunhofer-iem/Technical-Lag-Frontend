export const WelcomePageStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100vh',
        padding: '0 20px',
        paddingTop: '15vh',
    },
    title: {
        fontSize: '4rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        animation: 'fadeIn 1s ease-in forwards',
    },
    description: {
        fontSize: '1.5rem',
        fontWeight: '500',
        textAlign: 'center' as const,
        marginBottom: '2rem',
        maxWidth: '800px',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
        animation: 'fadeIn 1.5s ease-in forwards',
    },
    getStartedButton: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        animation: 'fadeIn 2s ease-in forwards',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
    },
    footer: {
        position: 'absolute' as const,
        fontWeight: '500',
        bottom: '100px',
    },
};

// Add global styles for animations
const styles = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject styles into the document
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

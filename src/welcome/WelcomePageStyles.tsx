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

    },
    description: {
        fontSize: '1.2rem',
        textAlign: 'center' as const,
        marginBottom: '2rem',
        maxWidth: '600px',
    },
    getStartedButton: {
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
};

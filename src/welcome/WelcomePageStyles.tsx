export const WelcomePageStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '0 20px',
    },
    title: {
        fontSize: '3rem',
        marginBottom: '1rem',
        color: '#333',
    },
    description: {
        fontSize: '1.2rem',
        textAlign: 'center' as const,
        marginBottom: '2rem',
        color: '#666',
        maxWidth: '600px',
    },
    getStartedButton: {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#72a695',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export const WelcomePageStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100vh',
        padding: '0 20px',
        paddingTop: '15vh',
        backgroundColor: 'var(--bg-color)',
        backgroundImage: 'var(--bg-img)',
        backgroundPosition: 'center',
    },
    title: {
        color: 'var(--txt-color)',
    },
    description: {
        fontSize: '1.2rem',
        textAlign: 'center' as const,
        marginBottom: '2rem',
        color: 'var(--txt-color)',
        maxWidth: '600px',
    },
    getStartedButton: {
        color: 'var(--btn-txt-color)',
        backgroundColor: 'var(--btn-bg)',
/*        border: 'none',
        borderRadius: '5px',*/
/*        cursor: 'pointer',*/
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
};

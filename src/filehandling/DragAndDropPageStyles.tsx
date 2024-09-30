export const DragNDropStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
        padding: '0 20px',
        paddingTop: '10vh',
        textAlign: 'center' as const,
/*        backgroundColor: 'var(--background-color)',*/
/*        backgroundImage: 'var(--background-image)',*/
        backgroundPosition: 'center',
    },
    description: {
        fontSize: '1.5rem',
        marginBottom: '20px',
        color: 'var(--txt-color)',
    },
    requirements: {
        fontSize: '1rem',
        marginTop: '20px',
        color: 'var(--txt-color)',
    },
    message: {
        fontSize: '1rem',
        color: 'var(--txt-color)',
        marginTop: '20px',
    },
};

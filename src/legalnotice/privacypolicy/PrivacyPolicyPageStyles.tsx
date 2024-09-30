export const PPPStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        padding: '0 20px',
        height: '100vh',
        maxWidth: '80vw',
        margin: 'auto',
        backgroundPosition: 'center',
        overflowY: 'auto' as const,
        overflowX: 'hidden' as const
    },
    title: {
        fontSize: '2.5em',
        fontWeight: 'bold',
        marginBottom: '5px',
        color: 'var(--text-color)',
    },
    section: {
        fontSize: '1.5em',
        fontWeight: 'bold',
        marginTop: '20px',
        color: 'var(--text-color)',
    },
    description: {
        fontSize: '1em',
        lineHeight: '1.6',
        marginTop: '10px',
        color: 'var(--text-color)',
    },
};

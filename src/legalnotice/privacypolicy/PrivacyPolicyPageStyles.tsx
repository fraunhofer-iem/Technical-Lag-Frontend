export const PPPStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        padding: '0 20px',
        height: '100vh',
        maxWidth: '80vw',
        margin: 'auto',
        overflowY: 'auto' as const,
        overflowX: 'hidden' as const
    },
    title: {
        fontSize: '2.5em',
        fontWeight: 'bold',
        marginBottom: "10px",
        marginTop: "20px",
    },
    section: {
        fontSize: '1.5em',
        fontWeight: 'bold',
        marginTop: '15px',
    },
    description: {
        fontSize: '1em',
        lineHeight: '1.6',
        marginTop: '10px',
    },
};

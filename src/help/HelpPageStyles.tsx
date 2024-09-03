export const HelpPageStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        padding: '0 20px',
        height: '100vh',
        maxWidth: '80vw',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: 'var(--background-color)',
        backgroundImage: 'var(--background-image)',
        backgroundPosition: 'center',
        overflowY: 'auto',
        overflowX: 'hidden',
        color: 'var(--text-color)',
        lineHeight: '1.6',
    },
    title: {
        fontSize: "2.5em",
        marginBottom: "10px",
        color: 'var(--text-color)',
    },
    section: {
        fontSize: "1em",
        marginTop: '30px',
        color: 'var(--text-color)',
    },
    sectionTitle: {
        fontSize: '1.8em',
        marginBottom: '10px',
        color: 'var(--text-color)',
    },
    description: {
        fontSize: '1.2em',
        lineHeight: "1.6",
        marginTop: '10px',
        color: 'var(--text-color)',
    },
};

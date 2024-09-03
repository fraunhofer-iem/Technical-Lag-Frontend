export const PPPStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        padding: '0 20px',
        height: '100vh',
        maxWidth: "80vw",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        backgroundColor: 'var(--background-color)',
        backgroundImage: 'var(--background-image)',
        backgroundPosition: 'center',
        overflowY: 'auto',
        overflowX: 'hidden',
    },

    title: {
        fontSize: "2.5em",
        marginBottom: "10px",
        color: 'var(--text-color)',
    },

    section: {
        fontSize: "1.5em",
        marginTop: "20px",
        color: 'var(--text-color)',
    },

    description: {
        fontSize: "1em",
        lineHeight: "1.6",
        marginTop: '20px',
        color: 'var(--text-color)',
    },
};

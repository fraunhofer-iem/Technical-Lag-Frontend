export const HelpPageStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        padding: '0 20px',
        maxWidth: '90vw',
        margin: 'auto',
        boxSizing: 'border-box' as const,
    },
    title: {
        fontWeight: 'bold',
        fontSize: "2.5em",
        marginBottom: "30px",
        marginTop: "10px",
        color: 'var(--txt-color)',
    },
    section: {
        color: 'var(--txt-color)',
        padding: '8px',
        marginBottom: '30px',
        backgroundColor: 'var(--bg-color)',
        borderRadius: '8px'
    },
    sectionTitle: {
        fontWeight: 'bold',
        color: 'var(--txt-color)',
        marginBottom: '2px'
    },
    description: {
        lineHeight: "1.6",
        marginTop: '10px',
        color: 'var(--txt-color)',
    },
};

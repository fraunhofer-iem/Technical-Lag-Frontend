const styles = {
    sidebar: {
        position: 'fixed' as const,
        right: 0,
        top: '10%',
        width: '22%',
        height: '80vh',
        backgroundColor: '#333333',
        borderLeft: '2px solid #000',
        borderTop: '2px solid #000',
        borderBottom: '2px solid #000',
        borderRight: "none",
        padding: '10px',
        display: 'block',
        zIndex: 1000,
        color: '#ffffff',
        textAlign: 'left' as const,
        overflowY: 'auto' as const,
        borderBottomLeftRadius: "8px",
        borderTopLeftRadius: "8px",

        '@media (min-width: 1200px)': {
            width: '30%',
        },
    },
    closeButton: {
        marginRight: '20px',
        backgroundColor: 'transparent',
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        marginBottom: '10px',
    },
    header: {
        fontSize: '20px',
        color: '#73a796',
        fontWeight: 'bold',
        margin: 0,
    },
    paragraph: {
        marginBottom: '1em',
        marginTop: '1em',
        fontSize: '14px',
    },
    label: {
        color: '#73a796',
    },
    horizontalLine: {
        border: 0,
        height: '1px',
        backgroundColor: '#73a796',
    },
};

export default styles;

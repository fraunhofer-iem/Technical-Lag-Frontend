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
    subheader: {
        fontSize: '15px',
        color: '#73a796',
        fontWeight: 'bold',
        margin: 0,
        marginTop: '2em',
    },
    paragraph: {
        marginBottom: '1em',
        marginTop: '1em',
        fontSize: '14px',
    },
    list: {
        marginBottom: '1em',
        marginTop: '1em',
        fontSize: '14px',
    },
    accordionHeader: {
        cursor: 'pointer',
        fontSize: '16px',
        color: '#73a796',
        fontWeight: 'bold',
        margin: '0.2em 0',
        padding: '0.5em',
        border: '1px solid #73a796',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    accordionContent: {
        margin: '0.5em 0',
        padding: '0.5em',
        border: '1px solid #73a796',
    },
   accordionHeaderActive: {
        backgroundColor: '#5e5e5e', // Active background color
    },
    accordionHeaderHover: {
        backgroundColor: '#5e5e5e', // Hover background color
    },
    label: {
        color: '#73a796',
    },
    horizontalLine: {
        border: 0,
        height: '2px',
        backgroundColor: '#73a796',
    },
    select:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

export default styles;

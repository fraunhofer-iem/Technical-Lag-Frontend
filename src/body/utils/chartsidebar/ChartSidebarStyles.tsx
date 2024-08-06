const styles = {
    sidebar: {
        position: 'fixed' as const,
        right: 0,
        top: '10%',
        width: '22em',
        height: '80vh',
        backgroundColor: '#333333',
        borderLeft: '2px solid #000',
        borderTop: '2px solid #000',
        borderBottom: '2px solid #000',
        borderRight: "none",
        padding: '2em',
        display: 'block',
        zIndex: 1000,
        color: '#ffffff',
        textAlign: 'left' as const,
        overflowY: 'auto' as const,
        borderBottomLeftRadius: "8px",
        borderTopLeftRadius: "8px",

        '@media (minWidth: 1200px)': {
            width: '30em',
        },
    },
    closeButton: {
        position: 'relative' as const,
        border: 'none',
        padding: '0',
        width: '1.5em',
        height: '1.5em',
        borderRadius: '50%',
        background: 'transparent',
        color: '#ffffff',
        font: 'inherit',
        textIndent: '100%',
        cursor: 'pointer',
        outline: 'solid 0 transparent',
        boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5)',
        transition: 'background 0.3s ease',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
        },
    },
    closeButtonBeforeAfter: {
        position: 'absolute' as const,
        top: '20%',
        left: 'calc(50% - .0625em)',
        width: '.1em',
        height: '60%',
        borderRadius: '.1em',
        background: 'currentcolor',
        content: "''",
    },
    closeButtonBefore: {
        transform: 'rotate(45deg)',
    },
    closeButtonAfter: {
        transform: 'rotate(-45deg)',
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1em',
    },
    header: {
        fontSize: '22px',
        color: '#73a796',
        fontWeight: 'bold',
        margin: 0,
    },
    paragraph: {
        margin: '1em 0',
        fontSize: '14px',
    },
    list: {
        margin: '1em 0',
        fontSize: '14px',
    },
    accordionHeader: {
        cursor: 'pointer',
        fontSize: '16px',
        color: '#fff',
        fontWeight: 'bold',
        margin: '0.5em 0',
        padding: '0.8em 1em',
        border: '1px solid #73a796',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#444',
        borderRadius: '4px',
        transition: 'background-color 0.3s, color 0.3s',
    },
    accordionContent: {
        margin: '0 0 1em 0',
        padding: '0.8em 1em',
        borderLeft: '1px solid #73a796',
    },
   accordionHeaderStatisticsActive: {
        backgroundColor: '#5e5e5e',
    },
    accordionHeaderNodeActive: {
        backgroundColor: '#5e5e5e',
    },
    accordionHeaderChildrenActive: {
        backgroundColor: '#5e5e5e',
    },
    accordionHeaderStatisticsHover: {
        backgroundColor: '#666',
    },
    accordionHeaderNodeHover: {
        backgroundColor: '#666',
    },
    accordionHeaderChildrenHover: {
        backgroundColor: '#666',
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
        marginBottom: '1em',
    },
};

export default styles;

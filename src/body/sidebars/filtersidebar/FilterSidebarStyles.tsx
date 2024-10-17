// FilterSidebarStyles.ts
const styles = {
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1em',
    },
    header: {
        fontSize: '22px',
/*        color: 'var(--txt-color)',*/
        fontWeight: 'bold',
        margin: 0,
    },
    content: {
        display: 'flex',
        flexDirection: 'column' as const,
    },
    field: {
        marginBottom: '15px',
    },
    label: {
/*        color: 'var(--txt-color)',*/
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    searchButton: {
        marginTop: '10px',
        padding: '10px',
/*        color: 'var(--btn-txt-color)',
        backgroundColor: 'var(--btn-bg)',*/
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    applyButton: {
        marginTop: '10px',
        padding: '10px',
/*        color: 'var(--btn-txt-color)',
        backgroundColor: 'var(--btn-bg)',*/
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    resultsList: {
        listStyleType: 'none' as const,
        padding: 0,
        marginTop: '0.5em',
    },
    resultItem: {
/*        color: 'var(--btn-txt-color)',
        backgroundColor: 'var(--btn-bg)',*/
        fontSize: '14px',
        fontWeight: '500',
        padding: '0.5em',
        borderRadius: '4px',
        marginBottom: '5px',
        cursor: 'pointer',
        borderBottom: '1px solid #ccc',
        transition: 'background-color 0.3s ease',
    },
};

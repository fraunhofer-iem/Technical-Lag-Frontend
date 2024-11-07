// FilterSidebarStyles.ts
const styles = {
    drawer: {
        width: '350px',
        height: '80%',
        position: 'fixed',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 0,
        zIndex: 1300,
        borderRadius: '8px 0 0 8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1em',
    },
    sidebarHeader: {
        fontSize: '24px',
        fontWeight: 'bold',
        margin: 0,
    },
    filterHeader: {
        fontSize: '20px',
        fontWeight: 'bold',
        margin: 0,
        marginTop: '15px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column' as const,
        width: "100%",
        padding: '2em'
    },
    searchBarContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    },
    searchField: {
        flexGrow: 1,
        marginRight: '10px',
    },
    filterField: {
        marginBottom: '15px',
        marginTop: '15px',
        width: '100%'
    },
    searchButton: {
        marginTop: '5px',
        marginBottom: '15px',
    },
    applyButton: {
        marginTop: '5px',
        marginBottom: '15px',
    },
    resultsBlock: {
        backgroundColor: '#f9f9f9',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '10px',
    },
    resultsList: {
        listStyleType: 'none' as const,
        padding: 0,
        marginTop: '0.5em',
        letterSpacing: '0.1em',
    },
    resultItem: {
        fontSize: '14px',
        fontWeight: '500',
        padding: '0.75em 1em',
        borderRadius: '4px',
        marginBottom: '5px',
        cursor: 'pointer',
        borderBottom: '1px solid #ccc',
        borderLeft: '1px solid #73a796',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    },
};

export default styles;

export const FilterSidebarStyles = {
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1em',
    },
    sidebarHeader: {
        fontSize: '24px',
        fontWeight: 'bold',
        margin: 0,
    },
    filterHeader: {
        fontSize: '22px',
        fontWeight: 'bold',
        margin: 0,
        marginTop: '20px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column' as const,
        width: "100%",
        padding: '2em',
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
        width: '100%',
    },
    searchButton: {
        marginTop: '5px',
        marginBottom: '15px',
    },
    filterButtonContainer: {
        display: 'flex',
        gap: '10px',
        marginTop: '15px',
    },
    applyButton: {
        marginTop: '5px',
        marginBottom: '15px',
    },
    clearButton: {
        marginTop: '5px',
        marginBottom: '15px',
    },
    resultsBlock: {
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        marginTop: '20px',
    },
    resultsList: {
        listStyleType: 'none' as const,
        padding: 0,
        marginTop: '0.5em',
        letterSpacing: '0.1em',
    },
    resultItem: {
        fontSize: '16px',
        fontWeight: '500',
        padding: '0.2em',
        borderRadius: '8px',
        marginBottom: '10px',
        cursor: 'pointer',
        borderBottom: '1px solid',
        borderLeft: '4px solid',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
    },
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },
    selectAllButton: {
        marginTop: '10px',
        marginBottom: '10px',
    },
    selectedCounter: {
        marginTop: '10px',
        fontSize: '14px',
    },
    openSelectedButton: {
        marginTop: '20px',
    },
};

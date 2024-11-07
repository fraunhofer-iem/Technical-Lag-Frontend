const styles = {
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1em',
    },
    header: {
        fontSize: '22px',
        fontWeight: 'bold',
        margin: 0,
    },
    paragraph: {
        margin: '0.5em 0',
        fontSize: '16px',
    },
    list: {
        fontSize: '14px',
        margin: '0',
        padding: '0',
    },
    listItem: {
        fontSize: '14px',
        margin: '0',
        paddingTop: '0',
        paddingBottom: '0',
    },
    accordionHeader: {
        cursor: 'pointer',
        fontSize: '16px',
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
/*   accordionHeaderStatisticsActive: {
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
    },*/
    label: {
/*        color: '#73a796',*/
        margin: '0',
        padding: '0',
    },
    select:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1em',
    },
};

export default styles;

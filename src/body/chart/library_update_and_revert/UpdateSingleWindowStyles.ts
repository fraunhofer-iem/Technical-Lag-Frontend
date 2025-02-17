import { SxProps, Theme } from '@mui/material';

const UpdateSingleWindowStyles = {
    overlay: {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background
        zIndex: 1050,
        backdropFilter: 'blur(5px)', // Apply blur to the background
    },
    window: (theme: Theme): SxProps<Theme> => ({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '650px',
        height: 'auto',
        maxHeight: '80vh',
        borderRadius: '8px',
        boxShadow: `0 4px 6px ${theme.palette.grey[500]}`,
        padding: '20px',
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        overflowY: 'auto',
    }),
    closeButton: {
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        border: 'none',
        fontSize: '14px',
    },
    updateButton: {
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    closeButtonContainer: {
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '40px',
    },
    dropdown: {
        marginTop: "20px",
        minWidth: "200px",
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    listContainer: (theme: Theme): SxProps<Theme> => ({
        marginTop: '20px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
        maxWidth: '400px',
        maxHeight: '300px',
        overflowY: 'auto',
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: '4px',
        padding: '10px',
    }),
    listItem: (theme: Theme): SxProps<Theme> => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px',
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
        '&:last-child': {
            borderBottom: 'none',
        }
    })
};

export default UpdateSingleWindowStyles;

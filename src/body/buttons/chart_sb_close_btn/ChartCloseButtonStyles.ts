export const ChartCloseButtonStyles = {
    filterButton: {
        padding: "10px 20px",
        top: "10px",
        border: 'none',
        right: "0px",
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px',
        borderBottomLeftRadius: '8px',
        borderTopLeftRadius: '8px',
        display: "flex",
        fontSize: '1rem',
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center' as const,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    chartContainerStyle: {
        position: "fixed",
        right: '450px',
        top: "50px",
        transition: "right 0.3s ease-out",
        width: "auto",
        display: "flex",
        justifyContent: "center",
    }
};

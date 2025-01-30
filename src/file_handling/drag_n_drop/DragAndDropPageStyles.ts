export const DragNDropStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
        padding: '0 20px',
        paddingTop: '10vh',
        textAlign: 'center' as const,
    },
    description: {
        fontSize: '1.5rem',
        fontWeight: '500',
        textAlign: 'center' as const,
        marginBottom: '2rem',
        maxWidth: '800px',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
        animation: 'fadeIn 1.5s ease-in forwards',
    },
    requirements: {
        fontSize: '1.2rem',
        fontWeight: '500',
        marginTop: '20px',
        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
        animation: 'fadeIn 1.5s ease-in forwards',
    },
    footer: {
        position: 'absolute' as const,
        fontWeight: '500',
        bottom: '100px',
    },
};

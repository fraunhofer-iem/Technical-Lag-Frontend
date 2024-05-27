import React from 'react';

interface SidebarProps {
    fullName: string;
    versionNumber: string;
    releaseDate: string;
    onClose: () => void;
    ecosystem?: string;
    ortVersion?: string;
    javaVersion?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ fullName, versionNumber, releaseDate, onClose, ecosystem, ortVersion, javaVersion }) => {
    // Convert milliseconds to a Date object
    const formattedReleaseDate = !isNaN(parseInt(releaseDate))
        ? new Date(parseInt(releaseDate)).toLocaleString()
        : 'Invalid Date';

    return (
        <div style={styles.sidebar}>
            <button onClick={onClose} style={styles.closeButton}> X </button>
            <h2 style={styles.header}>Node Information</h2>
            <p style={styles.paragraph}><strong style={styles.label}>Node:</strong> {fullName}</p>
            <p style={styles.paragraph}><strong style={styles.label}>Version:</strong> {versionNumber}</p>
            <p style={styles.paragraph}><strong style={styles.label}>Release Date:</strong> {formattedReleaseDate}</p>

            {/* Conditionally render additional info for the root node */}
            {ecosystem && (
                <>
                    <p style={styles.paragraph}><strong style={styles.label}>Ecosystem:</strong> {ecosystem}</p>
                    <p style={styles.paragraph}><strong style={styles.label}>ORT Version:</strong> {ortVersion}</p>
                    <p style={styles.paragraph}><strong style={styles.label}>Java Version:</strong> {javaVersion}</p>
                </>
            )}
        </div>
    );
};

const styles = {
    sidebar: {
        position: 'fixed' as 'fixed',
        right: 0,
        top: '50px', // Adjust this value according to your header height
        width: '200px',
        height: 'calc(100% - 50px)', // Subtract header height from viewport height
        backgroundColor: '#454545',
        borderLeft: '1px solid #ddd',
        padding: '10px',
        display: 'block',
        zIndex: 1000, // Ensure the sidebar is above other elements
        color: '#ffffff', // Set text color to white for better visibility
        textAlign: 'left' as 'left',
    },
    closeButton: {
        marginBottom: '10px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#ffffff',
        fontSize: '16px',
        cursor: 'pointer',
    },
    header: {
        color: '#73a796',
        marginBottom: '10px',
    },
    paragraph: {
        marginBottom: '5px',
    },
    label: {
        color: '#73a796',
    },
};

export default Sidebar;
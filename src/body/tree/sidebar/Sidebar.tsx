import React from 'react';

interface SidebarProps {
    fullName: string;
    versionNumber: string;
    releaseDate: string;
    onClose: () => void;
    ecosystem?: string;
    ortVersion?: string;
    javaVersion?: string;
    repoURL: string,
    revision: string;
}

const Sidebar: React.FC<SidebarProps> = ({
                                             fullName,
                                             versionNumber,
                                             releaseDate,
                                             onClose,
                                             ecosystem,
                                             ortVersion,
                                             javaVersion,
                                             repoURL,
                                             revision
                                         }) => {
    // Convert milliseconds to a Date object
    const formattedReleaseDate = !isNaN(parseInt(releaseDate))
        ? new Date(parseInt(releaseDate)).toLocaleString()
        : 'Invalid Date';

    return (
        <div style={styles.sidebar}>
            <div style={styles.headerContainer}>
                <button onClick={onClose} style={styles.closeButton}>X</button>
                <p style={styles.header}>Node Information</p>
            </div>
            {fullName && (
                <>
                    <p style={styles.paragraph}><strong style={styles.label}>Node:</strong> <span
                        style={{wordBreak: 'break-all'}}>{fullName}</span></p>
                    <p style={styles.paragraph}><strong style={styles.label}>Version:</strong> {versionNumber}</p>
                    <p style={styles.paragraph}><strong style={styles.label}>Release Date:</strong> <span
                        style={{wordBreak: 'break-all'}}>{formattedReleaseDate}</span></p>
                </>
            )}

            {/* Conditionally render additional info for the root node */}
            {ecosystem && (
                <>
                    <p style={styles.paragraph}><strong style={styles.label}>Ecosystem:</strong> <span
                        style={{wordBreak: 'break-all'}}>{ecosystem}</span></p>
                    <p style={styles.paragraph}><strong style={styles.label}>ORT Version:</strong> <span
                        style={{wordBreak: 'break-all'}}>{ortVersion}</span></p>
                    <p style={styles.paragraph}><strong style={styles.label}>Java Version:</strong> <span
                        style={{wordBreak: 'break-all'}}>{javaVersion}</span></p>
                </>
            )}
            {repoURL && (
                <>
                    <p style={styles.paragraph}><strong style={styles.label}>Repository:</strong> <span
                        style={{wordBreak: 'break-all'}}>{repoURL}</span></p>
                    <p style={styles.paragraph}><strong style={styles.label}>Revision:</strong> <span
                        style={{wordBreak: 'break-all'}}>{revision}</span></p>
                </>
            )}
        </div>
    );
};

const styles = {
    sidebar: {
        position: 'fixed' as const,
        right: 0,
        top: '35px',
        width: '20%',
        height: 'calc(100vh - 50px)',
        backgroundColor: '#464646',
        borderLeft: '1px solid #ddd',
        padding: '10px',
        display: 'block',
        zIndex: 1000,
        color: '#ffffff',
        textAlign: 'left' as 'left',
        overflowY: 'scroll' as const,
    },
    closeButton: {
        marginRight: '22px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        marginBottom: '25px',
    },
    header: {
        fontSize: '22px',
        color: '#73a796',
        fontWeight: 'bold',
        margin: 0,
    },
    paragraph: {
        marginBottom: '5px',
    },
    label: {
        color: '#73a796',
    },
};

export default Sidebar;
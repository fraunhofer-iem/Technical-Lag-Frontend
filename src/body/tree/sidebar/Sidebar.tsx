import React from 'react';

interface SidebarProps {
    fullName: string;
    versionNumber: string;
    releaseDate: string;
    onClose: () => void;
    ecosystem?: string;
    repoURL?: string,
    revision?: string;
    stats?: any;
}

const Sidebar: React.FC<SidebarProps> = ({
                                             fullName,
                                             versionNumber,
                                             releaseDate,
                                             onClose,
                                             ecosystem,
                                             repoURL,
                                             revision,
                                             stats
                                         }) => {
    // Convert milliseconds to a Date object
    const formattedReleaseDate = !isNaN(parseInt(releaseDate))
        ? new Date(parseInt(releaseDate)).toLocaleString()
        : 'Invalid Date';

    /*    const renderStats = (type: string, data: any) => (
            <div>
                <h3>{type} Updates</h3>
                <p><strong>Technical Lag (libDays):</strong> {data.technicalLag.libDays}</p>
                <p><strong>Version:</strong> {data.technicalLag.version}</p>
                <p><strong>Release Frequency (releases/month):</strong> {data.technicalLag.releaseFrequency.releasesPerMonth.toFixed(1)}</p>
                <p><strong>Number of Missed Releases:</strong> {data.technicalLag.numberOfMissedReleases}</p>
                <p><strong>Children Avg LibDays:</strong> {data.libDays.average}</p>
                <p><strong>Children LibDays StdDev:</strong> {data.libDays.stdDev}</p>
                <p><strong>Children Avg Missed Releases:</strong> {data.missedReleases.average}</p>
                <p><strong>Children Missed Releases StdDev:</strong> {data.missedReleases.stdDev}</p>
                <p><strong>Distance First Avg:</strong> {data.distance.first.average}</p>
                <p><strong>Distance Second Avg:</strong> {data.distance.second.average}</p>
                <p><strong>Distance Third Avg:</strong> {data.distance.third.average}</p>
                <p><strong>Release Frequency Avg:</strong> {data.releaseFrequency.average}</p>
                <p><strong>Release Frequency StdDev:</strong> {data.releaseFrequency.stdDev}</p>
            </div>
        );*/

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

            {ecosystem && repoURL && revision && (
                <>
                    <p style={styles.paragraph}><strong style={styles.label}>Ecosystem:</strong> <span
                        style={{wordBreak: 'break-all'}}>{ecosystem}</span></p>
                    <p style={styles.paragraph}><strong style={styles.label}>Repository:</strong> <span
                        style={{wordBreak: 'break-all'}}>{repoURL}</span></p>
                    <p style={styles.paragraph}><strong style={styles.label}>Revision:</strong> <span
                        style={{wordBreak: 'break-all'}}>{revision}</span></p>
                </>
            )}

            {stats && (
                <>
                    <p style={styles.paragraph}><strong style={styles.label}>Minor Updates:</strong> {JSON.stringify(stats.Minor)}</p>
                    <p style={styles.paragraph}><strong style={styles.label}>Major Updates:</strong> {JSON.stringify(stats.Major)}</p>
                    <p style={styles.paragraph}><strong style={styles.label}>Patch Updates:</strong> {JSON.stringify(stats.Patch)}</p>
                </>
            )}
        </div>
    );
};

const styles = {
    sidebar: {
        position: 'fixed' as const,
        right: 0,
        top: '10%',
        width: '20%',
        height: '80vh',
        backgroundColor: '#000000',
        borderLeft: '2px solid #ddd',
        borderTop: '2px solid #ddd',
        borderBottom: '2px solid #ddd',
        borderRight: "none",
        padding: '10px',
        display: 'block',
        zIndex: 1000,
        color: '#ffffff',
        textAlign: 'left' as const,
        overflowY: 'auto' as const,
        borderBottomLeftRadius: "8px",
        borderTopLeftRadius: "8px",
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
        marginBottom: '5px', //ggf margin kleiner
        //Text größe
    },
    label: {
        color: '#73a796',
    },
};

export default Sidebar;

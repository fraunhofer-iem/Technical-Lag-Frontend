import React from 'react';
import styles from './SidebarStyles';

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

    const renderStats = (stats: any) => (
        <div>
            <p style={styles.header}>Statistics</p>
            <hr style={styles.horizontalLine}/>
            <p style={styles.paragraph}><strong style={styles.label}>Technical Lag (libDays):</strong> <span
                style={{wordBreak: 'break-all'}}>{stats.technicalLag?.libDays ?? 'N/A'}</span>
            </p>
            <p style={styles.paragraph}><strong style={styles.label}>Release Frequency
                (releases/month):</strong> <span
                style={{wordBreak: 'break-all'}}>{stats.technicalLag?.releaseFrequency?.releasesPerMonth?.toFixed(1) ?? 'N/A'}</span>
            </p>
            <p style={styles.paragraph}><strong style={styles.label}>Number of Missed
                Releases:</strong> <span
                style={{wordBreak: 'break-all'}}>{stats.technicalLag?.numberOfMissedReleases ?? 'N/A'}</span></p>
            <p style={styles.paragraph}><strong style={styles.label}>Children Avg LibDays:</strong> <span
                style={{wordBreak: 'break-all'}}>{stats.libDays?.average ?? 'N/A'}</span></p>
            <p style={styles.paragraph}><strong style={styles.label}>Children LibDays StdDev:</strong> <span
                style={{wordBreak: 'break-all'}}>{stats.libDays?.stdDev ?? 'N/A'}</span></p>
            <p style={styles.paragraph}><strong style={styles.label}>Children Avg Missed
                Releases:</strong> <span
                style={{wordBreak: 'break-all'}}>{stats.missedReleases?.average ?? 'N/A'}</span></p>
            <p style={styles.paragraph}><strong style={styles.label}>Children Missed Releases
                StdDev:</strong> <span
                style={{wordBreak: 'break-all'}}>{stats.missedReleases?.stdDev ?? 'N/A'}</span></p>
            <p style={styles.paragraph}><strong style={styles.label}>Distance First Avg:</strong> <span
                style={{wordBreak: 'break-all'}}>{stats.distance?.first?.average ?? 'N/A'}</span>
            </p>
            <p style={styles.paragraph}><strong style={styles.label}>Distance Second Avg:</strong> <span
                style={{wordBreak: 'break-all'}}>{stats.distance?.second?.average ?? 'N/A'}</span>
            </p>
            <p style={styles.paragraph}><strong style={styles.label}>Distance Third Avg:</strong> <span
                style={{wordBreak: 'break-all'}}>{stats.distance?.third?.average ?? 'N/A'}</span>
            </p>
            <p style={styles.paragraph}><strong style={styles.label}>Release Frequency
                Avg:</strong> <span
                style={{wordBreak: 'break-all'}}>{stats.releaseFrequency?.average ?? 'N/A'}</span></p>
            <p style={styles.paragraph}><strong style={styles.label}>Release Frequency
                StdDev:</strong> <span
                style={{wordBreak: 'break-all'}}>{stats.releaseFrequency?.stdDev ?? 'N/A'}</span></p>
        </div>
    );

    return (
        <div style={styles.sidebar}>
            <div style={styles.headerContainer}>
                <button onClick={onClose} style={styles.closeButton}>X</button>
                <p style={styles.header}>Node Information</p>
            </div>
            <hr style={styles.horizontalLine}/>
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

            {stats && renderStats(stats)}
        </div>
    );
};

export default Sidebar;

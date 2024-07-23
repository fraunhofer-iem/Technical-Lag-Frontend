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

    const [isTechnicalLagNodeOpen, setIsTechnicalLagNodeOpen] = React.useState(false);
    const [isTechnicalLagChildrenOpen, setIsTechnicalLagChildrenOpen] = React.useState(false);
    const [isStatisticsOpen, setIsStatisticsOpen] = React.useState(false);
    const [versionType, setVersionType] = React.useState('1'); // Default to 'Minor'
    const [isAccordionHovered, setIsAccordionHovered] = React.useState(false);


    const handleVersionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setVersionType(event.target.value);
    };

    // Extract data based on the selected version type
    const getLagData = (type: string) => {
        const lag = stats?.stats?.technicalLag || {};
        return {
            distance: {
                first: lag.distance?.first?.[type] || '',
                second: lag.distance?.second?.[type] || '',
                third: lag.distance?.third?.[type] || ''
            },
            releaseFrequency: {
                releasesPerDay: lag.releaseFrequency?.releasesPerDay || '',
                releasesPerWeek: lag.releaseFrequency?.releasesPerWeek || '',
                releasesPerMonth: lag.releaseFrequency?.releasesPerMonth || ''
            },
            libDays: lag.libDays || '',
            version: lag.version || '',
            numberOfMissedReleases: lag.numberOfMissedReleases || ''
        };
    };

    const getChildrenData = (type: string) => {
        const children = stats?.stats?.children || {};
        return {
            libDays: {
                average: children.libDays?.average?.[type] || '',
                stdDev: children.libDays?.stdDev?.[type] || ''
            },
            missedReleases: {
                average: children.missedReleases?.average?.[type] || '',
                stdDev: children.missedReleases?.stdDev?.[type] || ''
            },
            distanceFirst: {
                average: children.distance?.first?.average?.[type] || ''
            },
            distanceSecond: {
                average: children.distance?.second?.average?.[type] || ''
            },
            distanceThird: {
                average: children.distance?.third?.average?.[type] || ''
            },
            releaseFrequency: {
                average: children.releaseFrequency?.average?.[type] || '',
                stdDev: children.releaseFrequency?.stdDev?.[type] || ''
            }
        };
    };

    const renderStats = () => (
        <div>
            <br/>
            <hr style={styles.horizontalLine}></hr>
            <br/>

            <div onClick={() => setIsStatisticsOpen(!isStatisticsOpen)} onMouseEnter={() => setIsAccordionHovered(true)}
                 onMouseLeave={() => setIsAccordionHovered(false)}
                 style={{
                     ...styles.accordionHeader,
                     ...(isAccordionHovered ? styles.accordionHeaderHover : {}),
                 }}>
                <p>Statistics {isStatisticsOpen ? '-' : '+'} </p>
            </div>

            {isStatisticsOpen && (
                <div style={styles.accordionContent}>
                    <div style={styles.select}>
                        <strong style={styles.label}>Version Type:&nbsp;
                            <select value={versionType} onChange={handleVersionTypeChange}>
                                <option value={"Minor"}>Minor</option>
                                <option value={"Major"}>Major</option>
                                <option value={"Patch"}>Patch</option>
                            </select>
                        </strong>
                    </div>

                    <div onClick={() => setIsTechnicalLagNodeOpen(!isTechnicalLagNodeOpen)}
                         onMouseEnter={() => setIsAccordionHovered(true)}
                         onMouseLeave={() => setIsAccordionHovered(false)}
                         style={{
                             ...styles.accordionHeader,
                             ...(isAccordionHovered ? styles.accordionHeaderHover : {}),
                         }}>
                        <p>Technical Lag Current Node {isTechnicalLagNodeOpen ? '-' : '+'}</p>
                    </div>
                    {isTechnicalLagNodeOpen && (
                        <div style={styles.accordionContent}>
                            <p style={styles.paragraph}><strong style={styles.label}>Lag in Days:</strong> {getLagData(versionType).libDays}</p>
                            <p style={styles.paragraph}><strong style={styles.label}>Newest Version:</strong> {getLagData(versionType).version}</p>
                            <p style={styles.paragraph}><strong style={styles.label}>Missed Releases:</strong> {getLagData(versionType).numberOfMissedReleases}</p>
                            <div>
                                <p style={styles.paragraph}><strong style={styles.label}>Distance:</strong></p>
                                <ul style={styles.list}>
                                    <li><strong style={styles.label}>First: </strong>{getLagData(versionType).distance.first}</li>
                                    <li><strong style={styles.label}>Second: </strong>{getLagData(versionType).distance.second}</li>
                                    <li><strong style={styles.label}>Third: </strong>{getLagData(versionType).distance.third}</li>
                                </ul>
                            </div>
                            <div>
                                <p style={styles.paragraph}><strong style={styles.label}>Release Frequency:</strong></p>
                                <ul style={styles.list}>
                                    <li><strong style={styles.label}>Per Day: </strong>{getLagData(versionType).releaseFrequency.releasesPerDay}</li>
                                    <li><strong style={styles.label}>Per Week: </strong>{getLagData(versionType).releaseFrequency.releasesPerWeek}</li>
                                    <li><strong style={styles.label}>Per Month: </strong>{getLagData(versionType).releaseFrequency.releasesPerMonth}</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    <div onClick={() => setIsTechnicalLagChildrenOpen(!isTechnicalLagChildrenOpen)}
                         onMouseEnter={() => setIsAccordionHovered(true)}
                         onMouseLeave={() => setIsAccordionHovered(false)}
                         style={{
                             ...styles.accordionHeader,
                             ...(isAccordionHovered ? styles.accordionHeaderHover : {}),
                         }}>
                        <p>Technical Lag Children {isTechnicalLagChildrenOpen ? '-' : '+'}</p>
                    </div>
                    {isTechnicalLagChildrenOpen && (
                        <div style={styles.accordionContent}>
                            <p style={styles.paragraph}><strong style={styles.label}>Lag in Days:</strong></p>
                            <ul style={styles.list}>
                                <li><strong style={styles.label}>Avg: </strong>{getChildrenData(versionType).libDays.average}</li>
                                <li><strong style={styles.label}>Std Dev: </strong>{getChildrenData(versionType).libDays.stdDev}</li>
                            </ul>
                            <div>
                                <p style={styles.paragraph}><strong style={styles.label}>Missed Releases:</strong></p>
                                <ul style={styles.list}>
                                    <li><strong style={styles.label}>Avg: </strong>{getChildrenData(versionType).missedReleases.average}</li>
                                    <li><strong style={styles.label}>Std Dev: </strong>{getChildrenData(versionType).missedReleases.stdDev}</li>
                                </ul>
                            </div>
                            <div>
                                <p style={styles.paragraph}><strong style={styles.label}>Distance:</strong></p>
                                <ul style={styles.list}>
                                    <li><strong style={styles.label}>First Avg: </strong>{getChildrenData(versionType).distanceFirst.average}</li>
                                    <li><strong style={styles.label}>Second Avg: </strong>{getChildrenData(versionType).distanceSecond.average}</li>
                                    <li><strong style={styles.label}>Third Avg: </strong>{getChildrenData(versionType).distanceThird.average}</li>
                                </ul>
                            </div>
                            <div>
                                <p style={styles.paragraph}><strong style={styles.label}>Release Frequency:</strong></p>
                                <ul style={styles.list}>
                                    <li><strong style={styles.label}>Avg: </strong>{getChildrenData(versionType).releaseFrequency.average}</li>
                                    <li><strong style={styles.label}>Std Dev: </strong>{getChildrenData(versionType).releaseFrequency.stdDev}</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            )}
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

            {stats && renderStats()}
        </div>
    );
};

export default Sidebar;
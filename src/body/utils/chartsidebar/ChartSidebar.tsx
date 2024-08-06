import React from 'react';
import styles from './ChartSidebarStyles.tsx';
import {Stats} from "../Types.tsx";

interface SidebarProps {
    fullName: string;
    versionNumber: string;
    releaseDate: string;
    onClose: () => void;
    ecosystem?: string;
    repoURL?: string,
    revision?: string;
    stats?: Stats[];
}

const ChartSidebar: React.FC<SidebarProps> = ({
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

    const formatNumber = (num: number | undefined) => {
        if (num === undefined) return '0.00';
        return num.toFixed(2);
    };


    const [isTechnicalLagNodeOpen, setIsTechnicalLagNodeOpen] = React.useState(false);
    const [isTechnicalLagChildrenOpen, setIsTechnicalLagChildrenOpen] = React.useState(false);
    const [isStatisticsOpen, setIsStatisticsOpen] = React.useState(false);

    type VersionType = 'Minor' | 'Major' | 'Patch';
    const [versionType, setVersionType] = React.useState<VersionType>('Major');

    const [isAccordionStatisticsHovered, setIsAccordionStatisticsHovered] = React.useState(false);
    const [isAccordionNodeHovered, setIsAccordionNodeHovered] = React.useState(false);
    const [isAccordionChildrenHovered, setIsAccordionChildrenHovered] = React.useState(false);

    const [isAccordionStatisticsActive, setIsAccordionStatisticsActive] = React.useState(false);
    const [isAccordionNodeActive, setIsAccordionNodeActive] = React.useState(false);
    const [isAccordionChildrenActive, setIsAccordionChildrenActive] = React.useState(false);

    const handleVersionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setVersionType(event.target.value as VersionType);
    };

    const getStatsByVersionType = (versionType: VersionType) => {
        const defaultStats = {
            technicalLag: {
                libDays: 0,
                distance: {first: 0, second: 0, third: 0},
                version: 'N/A ',
                releaseFrequency: {releasesPerDay: 0, releasesPerWeek: 0, releasesPerMonth: 0},
                numberOfMissedReleases: 0
            },
            children: {
                libDays: {average: 0, stdDev: 0},
                missedReleases: {average: 0, stdDev: 0},
                distance: {first: {average: 0}, second: {average: 0}, third: {average: 0}},
                releaseFrequency: {average: 0, stdDev: 0}
            }
        };

        return stats?.find(s => s.versionType === versionType)?.stats || defaultStats;
    };

    // Extract data based on the selected version type
    const getLagData = (versionType: VersionType) => {
        const lag = getStatsByVersionType(versionType).technicalLag;
        return {
            distance: {
                first: lag.distance?.first,
                second: lag.distance?.second,
                third: lag.distance?.third
            },
            releaseFrequency: {
                releasesPerMonth: lag.releaseFrequency?.releasesPerMonth
            },
            libDays: lag.libDays,
            version: lag.version,
            numberOfMissedReleases: lag.numberOfMissedReleases
        };
    };

    const getChildrenData = (versionType: VersionType) => {
        const childLag = getStatsByVersionType(versionType).children;
        return {
            libDays: {
                average: childLag.libDays?.average,
                stdDev: childLag.libDays?.stdDev
            },
            missedReleases: {
                average: childLag.missedReleases?.average,
                stdDev: childLag.missedReleases?.stdDev
            },
            distanceFirst: {
                average: childLag.distance?.first?.average
            },
            distanceSecond: {
                average: childLag.distance?.second?.average
            },
            distanceThird: {
                average: childLag.distance?.third?.average
            },
            releaseFrequency: {
                average: childLag.releaseFrequency?.average,
                stdDev: childLag.releaseFrequency?.stdDev
            }
        };
    };

    const renderDistance = () => {
        const lagData = getLagData(versionType).distance;
        switch (versionType) {
            case 'Major':
                return lagData.first;
            case 'Minor':
                return lagData.second;
            case 'Patch':
                return lagData.third;
            default:
                return 0;
        }
    };

    const renderStats = () => {
        const lagData = getLagData(versionType);
        const childrenData = getChildrenData(versionType);

        return (
            <div>
                <br/>
                <hr style={styles.horizontalLine}/>
                <br/>

                <button onClick={() => {
                    setIsStatisticsOpen(!isStatisticsOpen);
                    setIsAccordionStatisticsActive(!isAccordionStatisticsActive);
                }}
                        onMouseEnter={() => setIsAccordionStatisticsHovered(true)}
                        onMouseLeave={() => setIsAccordionStatisticsHovered(false)}
                        style={{
                            ...styles.accordionHeader,
                            ...(isAccordionStatisticsHovered ? styles.accordionHeaderStatisticsHover : {}),
                            ...(isAccordionStatisticsActive ? styles.accordionHeaderStatisticsActive : {})
                        }}>
                    <p>Technical Lag Statistics {isStatisticsOpen ? '-' : '+'}</p>
                </button>

                {isStatisticsOpen && (
                    <div style={styles.accordionContent}>
                        <div style={styles.select}>
                            <strong style={styles.label}>Version Type:&nbsp;{' '}
                                <select value={versionType} onChange={handleVersionTypeChange}>
                                    <option value={"Major"}>Major</option>
                                    <option value={"Minor"}>Minor</option>
                                    <option value={"Patch"}>Patch</option>
                                </select>
                            </strong>
                        </div>

                        <button onClick={() => {
                            setIsTechnicalLagNodeOpen(!isTechnicalLagNodeOpen);
                            setIsAccordionNodeActive(!isAccordionNodeActive);
                        }}
                                onMouseEnter={() => setIsAccordionNodeHovered(true)}
                                onMouseLeave={() => setIsAccordionNodeHovered(false)}
                                style={{
                                    ...styles.accordionHeader,
                                    ...(isAccordionNodeHovered ? styles.accordionHeaderNodeHover : {}),
                                    ...(isAccordionNodeActive ? styles.accordionHeaderNodeActive : {})
                                }}>
                            <p>Current Node {isTechnicalLagNodeOpen ? '-' : '+'}</p>
                        </button>
                        {isTechnicalLagNodeOpen && (
                            <div style={styles.accordionContent}>
                                <p style={styles.paragraph}><strong style={styles.label}>Lag in
                                    Days:</strong> {formatNumber(lagData.libDays)}</p>
                                <p style={styles.paragraph}><strong style={styles.label}>Newest
                                    Version:</strong> {lagData.version}</p>
                                <p style={styles.paragraph}><strong style={styles.label}>Missed
                                    Releases:</strong> {formatNumber(lagData.numberOfMissedReleases)}</p>
                                <p style={styles.paragraph}><strong
                                    style={styles.label}>Distance:&nbsp;</strong>{formatNumber(renderDistance())}
                                </p>
                                <p style={styles.paragraph}><strong style={styles.label}>Release
                                    Frequency:</strong> {formatNumber(lagData.releaseFrequency.releasesPerMonth)} per
                                    Month
                                </p>
                            </div>
                        )}

                        <button onClick={() => {
                            setIsTechnicalLagChildrenOpen(!isTechnicalLagChildrenOpen);
                            setIsAccordionChildrenActive(!isAccordionChildrenActive);
                        }}
                                onMouseEnter={() => setIsAccordionChildrenHovered(true)}
                                onMouseLeave={() => setIsAccordionChildrenHovered(false)}
                                style={{
                                    ...styles.accordionHeader,
                                    ...(isAccordionChildrenHovered ? styles.accordionHeaderChildrenHover : {}),
                                    ...(isAccordionChildrenActive ? styles.accordionHeaderChildrenActive : {})
                                }}>
                            <p>Children {isTechnicalLagChildrenOpen ? '-' : '+'}</p>
                        </button>
                        {isTechnicalLagChildrenOpen && (
                            <div style={styles.accordionContent}>
                                <p style={styles.paragraph}><strong style={styles.label}>Lag in Days:</strong></p>
                                <ul style={styles.list}>
                                    <li><strong
                                        style={styles.label}>Avg:</strong> {formatNumber(childrenData.libDays.average)}
                                    </li>
                                    <li><strong style={styles.label}>Std
                                        Dev:</strong> {formatNumber(childrenData.libDays.stdDev)}</li>
                                </ul>
                                <div>
                                    <p style={styles.paragraph}><strong style={styles.label}>Missed Releases:</strong>
                                    </p>
                                    <ul style={styles.list}>
                                        <li><strong
                                            style={styles.label}>Avg:</strong> {formatNumber(childrenData.missedReleases.average)}
                                        </li>
                                        <li><strong style={styles.label}>Std
                                            Dev:</strong> {formatNumber(childrenData.missedReleases.stdDev)}</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style={styles.paragraph}><strong style={styles.label}>Distance:</strong></p>
                                    <ul style={styles.list}>
                                        <li><strong style={styles.label}>First
                                            Avg:</strong> {formatNumber(childrenData.distanceFirst.average)}</li>
                                        <li><strong style={styles.label}>Second
                                            Avg:</strong> {formatNumber(childrenData.distanceSecond.average)}</li>
                                        <li><strong style={styles.label}>Third
                                            Avg:</strong> {formatNumber(childrenData.distanceThird.average)}</li>
                                    </ul>
                                </div>
                                <div>
                                    <p style={styles.paragraph}><strong style={styles.label}>Release Frequency:</strong>
                                    </p>
                                    <ul style={styles.list}>
                                        <li><strong
                                            style={styles.label}>Avg:</strong> {formatNumber(childrenData.releaseFrequency.average)}
                                        </li>
                                        <li><strong style={styles.label}>Std
                                            Dev:</strong> {formatNumber(childrenData.releaseFrequency.stdDev)}</li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };


    return (
        <div style={styles.sidebar}>


            <div style={styles.headerContainer}>
                <button
                    onClick={onClose}
                    style={styles.closeButton}
                >
                    <span style={{...styles.closeButtonBeforeAfter, ...styles.closeButtonBefore}}/>
                    <span style={{...styles.closeButtonBeforeAfter, ...styles.closeButtonAfter}}/>
                </button>
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

export default ChartSidebar;

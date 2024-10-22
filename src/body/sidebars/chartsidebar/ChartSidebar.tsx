import React from 'react';
import styles from './ChartSidebarStyles.tsx';
import {Stats} from "../../../jsonutils/JSONStructureInterfaces.tsx";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    MenuItem,
    Select,
    Typography
} from '@mui/material';
import {ExpandMore} from "@mui/icons-material";

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

    /*    const [isAccordionStatisticsHovered, setIsAccordionStatisticsHovered] = React.useState(false);
        const [isAccordionNodeHovered, setIsAccordionNodeHovered] = React.useState(false);
        const [isAccordionChildrenHovered, setIsAccordionChildrenHovered] = React.useState(false);

        const [isAccordionStatisticsActive, setIsAccordionStatisticsActive] = React.useState(false);
        const [isAccordionNodeActive, setIsAccordionNodeActive] = React.useState(false);
        const [isAccordionChildrenActive, setIsAccordionChildrenActive] = React.useState(false);

        const handleVersionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setVersionType(event.target.value as VersionType);
        };*/

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
            <Box>
                <Divider/>
                <Button
                    variant="contained"
                    onClick={() => {
                        setIsStatisticsOpen(!isStatisticsOpen);
                    }}
                    style={styles.accordionHeader}>
                    <Typography>
                        Technical Lag Statistics {isStatisticsOpen ? '-' : '+'}
                    </Typography>
                </Button>

                {isStatisticsOpen && (
                    <Box style={styles.accordionContent}>
                        <Box style={styles.select}>
                            <strong style={styles.label}>Version Type:&nbsp;{' '}
                                <Select value={versionType}
                                        onChange={(e) => setVersionType(e.target.value as VersionType)} displayEmpty>
                                    <MenuItem value={"Major"}>Major</MenuItem>
                                    <MenuItem value={"Minor"}>Minor</MenuItem>
                                    <MenuItem value={"Patch"}>Patch</MenuItem>
                                </Select>
                            </strong>
                        </Box>

                        <Accordion expanded={isTechnicalLagNodeOpen}
                                   onChange={() => setIsTechnicalLagNodeOpen(!isTechnicalLagNodeOpen)}>
                            <AccordionSummary expandIcon={<ExpandMore/>}>
                                <Typography>Current Node</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <p style={styles.paragraph}><strong style={styles.label}>Lag in
                                    Days:</strong> {formatNumber(lagData.libDays)}</p>
                                <p style={styles.paragraph}><strong style={styles.label}>Newest
                                    Version:</strong> {lagData.version}</p>
                                <p style={styles.paragraph}><strong style={styles.label}>Missed
                                    Releases:</strong> {formatNumber(lagData.numberOfMissedReleases)}</p>
                                <p style={styles.paragraph}><strong
                                    style={styles.label}>Distance:&nbsp;</strong>{formatNumber(renderDistance())}</p>
                                <p style={styles.paragraph}><strong style={styles.label}>Release
                                    Frequency:</strong> {formatNumber(lagData.releaseFrequency.releasesPerMonth)} per
                                    Month</p>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={isTechnicalLagChildrenOpen}
                                   onChange={() => setIsTechnicalLagChildrenOpen(!isTechnicalLagChildrenOpen)}>
                            <AccordionSummary expandIcon={<ExpandMore/>}>
                                <Typography>Children</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography style={styles.paragraph}><strong style={styles.label}>Lag in Days:</strong></Typography>
                                <List style={styles.list}>
                                    <ListItem><strong
                                        style={styles.label}>Avg:</strong> {formatNumber(childrenData.libDays.average)}
                                    </ListItem>
                                    <ListItem><strong style={styles.label}>Std
                                        Dev:</strong> {formatNumber(childrenData.libDays.stdDev)}</ListItem>
                                </List>
                                <Box>
                                    <Typography style={styles.paragraph}><strong style={styles.label}>Missed
                                        Releases:</strong></Typography>
                                    <List style={styles.list}>
                                        <ListItem><strong
                                            style={styles.label}>Avg:</strong> {formatNumber(childrenData.missedReleases.average)}
                                        </ListItem>
                                        <ListItem><strong style={styles.label}>Std
                                            Dev:</strong> {formatNumber(childrenData.missedReleases.stdDev)}</ListItem>
                                    </List>
                                </Box>
                                <Box>
                                    <Typography style={styles.paragraph}><strong style={styles.label}>Distance:</strong></Typography>
                                    <List style={styles.list}>
                                        <ListItem><strong style={styles.label}>First
                                            Avg:</strong> {formatNumber(childrenData.distanceFirst.average)}</ListItem>
                                        <ListItem><strong style={styles.label}>Second
                                            Avg:</strong> {formatNumber(childrenData.distanceSecond.average)}</ListItem>
                                        <ListItem><strong style={styles.label}>Third
                                            Avg:</strong> {formatNumber(childrenData.distanceThird.average)}</ListItem>
                                    </List>
                                </Box>
                                <Box>
                                    <Typography style={styles.paragraph}><strong style={styles.label}>Release
                                        Frequency:</strong></Typography>
                                    <List style={styles.list}>
                                        <ListItem><strong
                                            style={styles.label}>Avg:</strong> {formatNumber(childrenData.releaseFrequency.average)}
                                        </ListItem>
                                        <ListItem><strong style={styles.label}>Std
                                            Dev:</strong> {formatNumber(childrenData.releaseFrequency.stdDev)}
                                        </ListItem>
                                    </List>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                )}
            </Box>
        );
    };

    return (
        <Drawer anchor="right" open={true} onClose={onClose}
                PaperProps={{
                    sx: {
                        width: '350px',
                        height: '80%',
                        position: 'fixed',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        right: 0,
                        zIndex: 1300,
                        borderRadius: '8px 0 0 8px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    },
                }}
        >
            <Box sx={{width: "100%", padding: '2em'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em'}}>
                    <Typography variant="h6">Node Information</Typography>
                </Box>
                <Divider/>
                {fullName && (
                    <Box>
                        <Typography style={styles.paragraph}><strong style={styles.label}>Node:</strong> <span
                            style={{wordBreak: 'break-all'}}>{fullName}</span></Typography>
                        <Typography style={styles.paragraph}><strong
                            style={styles.label}>Version:</strong> {versionNumber}</Typography>
                        <Typography style={styles.paragraph}><strong style={styles.label}>Release Date:</strong> <span
                            style={{wordBreak: 'break-all'}}>{formattedReleaseDate}</span></Typography>
                    </Box>
                )}

                {ecosystem && repoURL && revision && (
                    <Box>
                        <Typography style={styles.paragraph}><strong style={styles.label}>Ecosystem:</strong> <span
                            style={{wordBreak: 'break-all'}}>{ecosystem}</span></Typography>
                        <Typography style={styles.paragraph}><strong style={styles.label}>Repository:</strong> <span
                            style={{wordBreak: 'break-all'}}>{repoURL}</span></Typography>
                        <Typography style={styles.paragraph}><strong style={styles.label}>Revision:</strong> <span
                            style={{wordBreak: 'break-all'}}>{revision}</span></Typography>
                    </Box>
                )}

                {stats && renderStats()}

            </Box>
        </Drawer>
    );
};

export default ChartSidebar;

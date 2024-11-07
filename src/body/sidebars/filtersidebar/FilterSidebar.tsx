import React, {useState} from 'react';
import styles from './FilterSidebarStyles.tsx';
import {Box, Button, Divider, Drawer, List, ListItem, TextField, Typography} from "@mui/material";

/*import {DateField, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";*/


interface SidebarProps {
    onClose: () => void;
    onSearch: (searchTerm: string) => void;
    searchResults: any[];
    onResultClick: (node: any) => void;
    isOpen: boolean
}

const FilterSidebar: React.FC<SidebarProps> = ({onClose, onSearch, onResultClick, searchResults, isOpen}) => {
    const [searchTerm, setSearchTerm] = useState("");
    /*    const [versionNumber, setVersionNumber] = useState("");*/
    /*    const [releaseDate, setReleaseDate] = useState("");*/
    const [libDays, setLibDays] = useState("");
    /*const [numberOfMissedReleases, setNumberOfMissedReleases] = useState("");*/
    /*    const [releaseFrequency, setReleaseFrequency] = useState("");*/

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    const handleNodeClick = (node: Node) => {
        onResultClick(node);
        onClose();
    };

    //TODO Filter implementieren
    const handleFilter = () => {
        onSearch(searchTerm);
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}
                PaperProps={{
                    sx: {
                        width: '450px',
                        height: '85%',
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
            {/* Header */}
            <Box sx={styles.content}>
                <Box sx={styles.headerContainer}>
                    <Typography variant="h5" sx={styles.sidebarHeader}>Search & Filter</Typography>
                </Box>
                <Divider/>

                {/* Search Section */}
                <Box sx={{marginTop: '1em'}}>
                    <Box sx={styles.searchBarContainer}>
                        <TextField
                            label="Search by Node Name"
                            variant="outlined"
                            value={searchTerm}
                            placeholder="Search..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={styles.searchField}
                        />
                        <Button
                            onClick={handleSearch}
                            variant="contained"
                            sx={styles.searchButton}
                        >
                            Search
                        </Button>
                    </Box>

                    {/* Results Block */}
                    {searchResults.length > 0 && (
                        <Box sx={styles.resultsBlock}>
                            <List sx={styles.resultsList}>
                                {searchResults.map((result) => (
                                    <ListItem
                                        key={result.id} // Use a unique identifier
                                        onClick={() => (result.nodeName !== 'N/A' ? handleNodeClick(result) : undefined)}
                                        sx={{
                                            ...styles.resultItem,
                                            cursor: result.nodeName === 'N/A' ? 'not-allowed' : 'pointer', // Disable cursor for "No nodes found"
                                         }}
                                    >
                                        {result.nodeName === "N/A" ? (
                                            <Typography sx={{ color: 'gray', fontStyle: 'italic' }}>
                                                No nodes found
                                            </Typography>
                                        ) : (
                                            ["..", ...result.path.slice(1)].join(" / ")
                                        )}
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    )}

                    {/* Divider */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5em'
                    }}>
                        <Typography variant="h6" sx={styles.filterHeader}>More...</Typography>
                    </Box>
                    <Divider/>

                    {/* Filter Section */}
                    {/*                    <TextField
                        label="Version Number"
                        variant="outlined"
                        value={versionNumber}
                        onChange={(e) => setVersionNumber(e.target.value)}
                        sx={styles.field}
                    />*/}
                    {/*                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField
                            label="Release Date"
                            value={releaseDate}
                            onChange={(e) => setReleaseDate(e.target.value)}
                            sx={styles.field}
                        />
                    </LocalizationProvider>*/}
                    <TextField
                        label="Lag in Days"
                        type="number"
                        value={libDays}
                        onChange={(e) => setLibDays(e.target.value)}
                        sx={styles.filterField}
                    />
                    {/*                    <TextField
                        label="Number of Missed Releases"
                        type="number"
                        value={numberOfMissedReleases}
                        onChange={(e) => setNumberOfMissedReleases(e.target.value)}
                        sx={styles.field}
                    />*/}
                    {/*                    <TextField
                        label="Release Frequency"
                        type="number"
                        value={releaseFrequency}
                        onChange={(e) => setReleaseFrequency(e.target.value)}
                        sx={styles.field}
                    />*/}
                    <Button
                        onClick={handleFilter}
                        variant="contained"
                        sx={styles.applyButton}>
                        Apply Filters
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default FilterSidebar;

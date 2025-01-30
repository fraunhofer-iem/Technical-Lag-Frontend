import React, {useState} from 'react';
import {FilterSidebarStyles} from './FilterSidebarStyles.ts';
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
        <Drawer anchor="right" open={isOpen} onClose={onClose} variant="persistent"
                PaperProps={{
                    sx: {
                        width: '450px',
                        height: '100%',
                        top: '44px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        borderLeft: '3px solid',
/*                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 450,
                        },*/
                    },
                }}
        >
            {/* Header */}
            <Box sx={FilterSidebarStyles.content}>
                <Box sx={FilterSidebarStyles.headerContainer}>
                    <Typography variant="h5" sx={FilterSidebarStyles.sidebarHeader}>Search</Typography>
                </Box>
                <Divider/>

                {/* Search Section */}
                <Box sx={{marginTop: '1em'}}>
                    <Box sx={FilterSidebarStyles.searchBarContainer}>
                        <TextField
                            label="Search by Node Name"
                            variant="outlined"
                            value={searchTerm}
                            placeholder="Search..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            fullWidth
                            sx={FilterSidebarStyles.searchField}
                        />
                        <Button
                            onClick={handleSearch}
                            variant="contained"
                            sx={FilterSidebarStyles.searchButton}
                        >
                            Search
                        </Button>
                    </Box>

                    {/* Results Block */}
                    {searchResults.length > 0 && (
                        <Box sx={FilterSidebarStyles.resultsBlock}>
                            <List sx={FilterSidebarStyles.resultsList}>
                                {searchResults.map((result) => (
                                    <ListItem
                                        key={result.id} // Use a unique identifier
                                        onClick={() => (result.nodeName !== 'N/A' ? handleNodeClick(result) : undefined)}
                                        sx={{
                                            ...FilterSidebarStyles.resultItem,
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
                        <Typography variant="h6" sx={FilterSidebarStyles.filterHeader}>Filter</Typography>
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
                        sx={FilterSidebarStyles.filterField}
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
                        sx={FilterSidebarStyles.applyButton}>
                        Apply Filters
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default FilterSidebar;

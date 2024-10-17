import React, {useState} from 'react';
import {Box, Button, Divider, Drawer, List, ListItem, TextField, Typography} from "@mui/material";

interface SidebarProps {
    onClose: () => void;
    onSearch: (searchTerm: string) => void;
    searchResults: any[];
    onResultClick: (node: any) => void;
    isOpen: boolean
}

const FilterSidebar: React.FC<SidebarProps> = ({onClose, onSearch, onResultClick, searchResults, isOpen}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [versionNumber, setVersionNumber] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [libDays, setLibDays] = useState("");
    const [numberOfMissedReleases, setNumberOfMissedReleases] = useState("");
    const [releaseFrequency, setReleaseFrequency] = useState("");

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}
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
                    <Typography variant="h6">Filter Options</Typography>
                </Box>
                <Divider/>
                <Box sx={{marginTop: '1em'}}>
                    <TextField
                        label="Search by Node Name"
                        variant="outlined"
                        value={searchTerm}
                        placeholder="Search..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{marginBottom: '15px', width: '100%'}}
                    />
                    <Button onClick={handleSearch} variant="contained" sx={{marginBottom: '15px'}}>
                        Search
                    </Button>
                    {searchResults.length > 0 && (
                        <List sx={{padding: 0}}>
                            {searchResults.map((result) => (
                                <ListItem
                                    key={result.id} // Use a unique identifier
                                    sx={{cursor: 'pointer', padding: '0.5em'}}
                                    onClick={() => onResultClick(result)}
                                >
                                    {["..", ...result.path.slice(1)].join(" / ")}
                                </ListItem>
                            ))}
                        </List>
                    )}
                    <TextField
                        label="Version Number"
                        variant="outlined"
                        value={versionNumber}
                        onChange={(e) => setVersionNumber(e.target.value)}
                        sx={{marginBottom: '15px', width: '100%'}}
                    />
                    <TextField
                        label="Release Date"
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        sx={{marginBottom: '15px', width: '100%'}}
                    />
                    <TextField
                        label="Lib Days"
                        type="number"
                        value={libDays}
                        onChange={(e) => setLibDays(e.target.value)}
                        sx={{marginBottom: '15px', width: '100%'}}
                    />
                    <TextField
                        label="Number of Missed Releases"
                        type="number"
                        value={numberOfMissedReleases}
                        onChange={(e) => setNumberOfMissedReleases(e.target.value)}
                        sx={{marginBottom: '15px', width: '100%'}}
                    />
                    <TextField
                        label="Release Frequency"
                        type="number"
                        value={releaseFrequency}
                        onChange={(e) => setReleaseFrequency(e.target.value)}
                        sx={{marginBottom: '15px', width: '100%'}}
                    />
                    {/* Uncomment this if you implement filter logic */}
                    {/* <Button onClick={handleFilterChange} variant="contained" sx={styles.applyButton}>Apply Filters</Button> */}
                </Box>
            </Box>
        </Drawer>
    );
};
/*    return (
        <div style={styles.sidebar}>
            <div style={styles.headerContainer}>
                <button onClick={onClose} style={styles.closeButton}>
                    <span style={{...styles.closeButtonBeforeAfter, ...styles.closeButtonBefore}}/>
                    <span style={{...styles.closeButtonBeforeAfter, ...styles.closeButtonAfter}}/>
                </button>
                <p style={styles.header}>Filter Options</p>
            </div>
            <hr style={styles.horizontalLine}/>
            <div style={styles.content}>
                <div style={styles.field}>
                    <label style={styles.label}>Search by Node Name<input type="text" value={searchTerm} placeholder="Search..."
                                                                          onChange={(e) => setSearchTerm(e.target.value)}
                                                                          style={styles.input}/></label>
                    <button onClick={handleSearch} style={styles.searchButton}>Search</button>
                </div>
                {searchResults.length > 0 && (
                    <ul style={styles.resultsList}>
                        {searchResults.map((result, index) => (
                            <li key={index} style={styles.resultItem} onClick={() => onResultClick(result)}>
                                {["..", ...result.path.slice(1)].join(" / ")}
                            </li>
                        ))}
                    </ul>
                )}
                <div style={styles.field}>
                    <label style={styles.label}>Version Number<input type="text" value={versionNumber}
                                                                     onChange={(e) => setVersionNumber(e.target.value)}
                                                                     style={styles.input}/></label>
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Release Date<input type="date" value={releaseDate}
                                                                   onChange={(e) => setReleaseDate(e.target.value)}
                                                                   style={styles.input}/></label>
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Lib Days<input type="number" value={libDays}
                                                               onChange={(e) => setLibDays(e.target.value)}
                                                               style={styles.input}/></label>
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Number of Missed Releases<input type="number"
                                                                                value={numberOfMissedReleases}
                                                                                onChange={(e) => setNumberOfMissedReleases(e.target.value)}
                                                                                style={styles.input}/></label>
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Release Frequency<input type="number" value={releaseFrequency}
                                                                        onChange={(e) => setReleaseFrequency(e.target.value)}
                                                                        style={styles.input}/></label>
                </div>
                {/!*                <button onClick={handleFilterChange} style={styles.applyButton}>Apply Filters</button>*!/}
            </div>
        </div>
    );
};*/

export default FilterSidebar;

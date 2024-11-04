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

    //TODO suche implementieren
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

export default FilterSidebar;

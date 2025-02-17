import React, {useState} from 'react';
import {FilterSidebarStyles} from './FilterSidebarStyles.ts';
import {Box, Button, Checkbox, Divider, Drawer, List, ListItem, Pagination, TextField, Typography} from "@mui/material";

interface SidebarProps {
    onClose: () => void;
    onSearch: (searchTerm: string) => void;
    searchResults: any[];
    onResultClick: (node: any) => void;
    isOpen: boolean
}

const FilterSidebar: React.FC<SidebarProps> = ({onClose, onSearch, onResultClick, searchResults, isOpen}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [libDays, setLibDays] = useState("");
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const resultsPerPage = 6;

    const handleSearch = () => {
        onSearch(searchTerm);
        setCurrentPage(1); // Reset to the first page on new search
    };

    const handleNodeClick = (node: Node) => {
        onResultClick(node);
        onClose();
    };

    //TODO Filter implementieren
    const handleFilter = () => {
        onSearch(searchTerm);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, result: any) => {
        event.stopPropagation(); // Stop the event from propagating to the ListItem
        setSelectedItems((prevSelected) =>
            prevSelected.includes(result)
                ? prevSelected.filter((item) => item !== result)
                : [...prevSelected, result]
        );
    };

    const handleSelectAll = () => {
        if (selectAllChecked) {
            // Deselect all items
            setSelectedItems([]);
        } else {
            // Select all items
            setSelectedItems(
                searchResults.filter((result) => result.nodeName !== 'N/A')
            );
        }
        setSelectAllChecked(!selectAllChecked);
    };

    const handlePaginationChange = (_event: any, value: number) => {
        setCurrentPage(value);
    };

    const currentPageResults = searchResults.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
    );

    const handleOpenWindow = () => {
        // For demonstration, we'll just log the selected items
        console.log("Opening window with selected items:", selectedItems);
        // Here you can implement the logic to open a new window with the selected items
    };


    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose} variant="persistent"
                PaperProps={{
                    sx: {
                        width: '460px',
                        height: '100%',
                        top: '44px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        borderLeft: '3px solid',
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
                                {currentPageResults.map((result) => (
                                    <ListItem
                                        key={result.id}
                                        onClick={() =>
                                            result.nodeName !== 'N/A' ? handleNodeClick(result) : undefined
                                        }
                                        sx={{
                                            ...FilterSidebarStyles.resultItem,
                                            cursor: result.nodeName === 'N/A' ? 'not-allowed' : 'pointer',
                                        }}
                                    >
                                        <Checkbox
                                            checked={selectedItems.includes(result)}
                                            onChange={(event) => handleCheckboxChange(event, result)}
                                        />
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
                            <Box sx={FilterSidebarStyles.paginationContainer}>
                                <Pagination
                                    count={Math.ceil(searchResults.length / resultsPerPage)}
                                    page={currentPage}
                                    onChange={handlePaginationChange}
                                    color="primary"
                                />
                            </Box>
                            <Button
                                onClick={handleSelectAll}
                                variant="outlined"
                                sx={FilterSidebarStyles.selectAllButton}
                            >
                                {selectAllChecked ? "Deselect All" : "Select All"}
                            </Button>
                            <Typography sx={FilterSidebarStyles.selectedCounter}>
                                Selected: {selectedItems.length} items
                            </Typography>
                            <Button
                                onClick={handleOpenWindow}
                                variant="contained"
                                sx={FilterSidebarStyles.openSelectedButton}
                                disabled={selectedItems.length === 0}
                            >
                                Open Selected
                            </Button>
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
                    <TextField
                        label="Lag in Days"
                        type="number"
                        value={libDays}
                        onChange={(e) => setLibDays(e.target.value)}
                        sx={FilterSidebarStyles.filterField}
                    />
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

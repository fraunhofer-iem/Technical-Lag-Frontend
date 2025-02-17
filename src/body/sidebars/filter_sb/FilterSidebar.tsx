import React, { useState } from 'react';
import { FilterSidebarStyles } from './FilterSidebarStyles.ts';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    Drawer,
    List,
    ListItem,
    Pagination,
    TextField,
    Typography,
} from "@mui/material";
import {UpdateSingleWindow} from "../../chart/library_update_and_revert/UpdateSingleWIndow.tsx";


interface SidebarProps {
    onClose: () => void;
    onSearch: (searchTerm: string) => void;
    searchResults: any[];
    onResultClick: (node: any) => void;
    isOpen: boolean;
}

const FilterSidebar: React.FC<SidebarProps> = ({
                                                   onClose,
                                                   onSearch,
                                                   onResultClick,
                                                   searchResults,
                                                   isOpen,
                                               }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [libDays, setLibDays] = useState("");
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [isUpdateWindowOpen, setIsUpdateWindowOpen] = useState(false);
    const resultsPerPage = 6;

    const handleSearch = () => {
        onSearch(searchTerm);
        setCurrentPage(1); // Reset to the first page on new search
    };

    const handleNodeClick = (node: any) => {
        onResultClick(node);
        onClose();
    };

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
        setIsUpdateWindowOpen(true);
    };

    const handleCloseUpdateWindow = () => {
        setIsUpdateWindowOpen(false);
    };

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={onClose}
            variant="persistent"
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
            <Box sx={FilterSidebarStyles.content}>
                <Box sx={FilterSidebarStyles.headerContainer}>
                    <Typography variant="h5" sx={FilterSidebarStyles.sidebarHeader}>
                        Search
                    </Typography>
                </Box>
                <Divider />

                <Box sx={{ marginTop: '1em' }}>
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

                    {searchResults.length > 0 && (
                        <Box sx={FilterSidebarStyles.resultsBlock}>
                            <List sx={FilterSidebarStyles.resultsList}>
                                {currentPageResults.map((result) => (
                                    <ListItem
                                        key={result.id}
                                        onContextMenu={(e) => {
                                            e.preventDefault(); // Prevent the default context menu
                                            if (result.nodeName !== 'N/A') {
                                                handleNodeClick(result);
                                            }
                                        }}
                                        sx={{
                                            ...FilterSidebarStyles.resultItem,
                                            cursor: result.nodeName === 'N/A' ? 'not-allowed' : 'context-menu',
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

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5em' }}>
                        <Typography variant="h6" sx={FilterSidebarStyles.filterHeader}>
                            Filter
                        </Typography>
                    </Box>
                    <Divider />

                    <TextField
                        label="Lag in Days"
                        type="number"
                        value={libDays}
                        onChange={(e) => setLibDays(e.target.value)}
                        sx={FilterSidebarStyles.filterField}
                    />
                    <Button onClick={handleFilter} variant="contained" sx={FilterSidebarStyles.applyButton}>
                        Apply Filters
                    </Button>
                </Box>
            </Box>

            {isUpdateWindowOpen && (
                <UpdateSingleWindow
                    onClose={handleCloseUpdateWindow}
                    selectedItems={selectedItems}
                />
            )}
        </Drawer>
    );
};

export default FilterSidebar;

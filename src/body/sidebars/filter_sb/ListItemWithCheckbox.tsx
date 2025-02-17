import React from 'react';
import { ListItem, Checkbox, Typography, Box } from "@mui/material";

interface ListItemWithCheckboxProps {
    result: any;
    isChecked: boolean;
    onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, result: any) => void;
    onClick: () => void;
}

const ListItemWithCheckbox: React.FC<ListItemWithCheckboxProps> = ({
                                                                       result,
                                                                       isChecked,
                                                                       onCheckboxChange,
                                                                       onClick,
                                                                   }) => {
    return (
        <ListItem
            sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: result.nodeName === 'N/A' ? 'not-allowed' : 'pointer',
            }}
            onClick={onClick}
        >
            <Checkbox
                checked={isChecked}
                onChange={(event) => onCheckboxChange(event, result)}
                sx={{ pointerEvents: 'auto' }} // Ensure checkbox is clickable
            />
            <Box sx={{ flexGrow: 1 }}>
                {result.nodeName === "N/A" ? (
                    <Typography sx={{ color: 'gray', fontStyle: 'italic' }}>
                        No nodes found
                    </Typography>
                ) : (
                    ["..", ...result.path.slice(1)].join(" / ")
                )}
            </Box>
        </ListItem>
    );
};

export default ListItemWithCheckbox;

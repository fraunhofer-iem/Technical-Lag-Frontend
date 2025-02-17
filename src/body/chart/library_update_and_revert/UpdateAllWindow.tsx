import React, {useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select, Typography, useTheme} from "@mui/material";
import UpdateAllWindowStyles from "./UpdateAllWindowStyles.ts";
import CloseButton from "../../buttons/update_window_buttons/CloseButton.tsx";
import DependencyUpdateButton from "../../buttons/update_window_buttons/DependencyUpdateButton.tsx";

interface UpdateWindowProps {
    onClose: () => void;
}

export const UpdateAllWindow: React.FC<UpdateWindowProps> = ({onClose}) => {
    const theme = useTheme();
    const [updateType, setUpdateType] = useState("major");

    return (
        <Box sx={UpdateAllWindowStyles.overlay}>
            <Box sx={UpdateAllWindowStyles.window(theme)}>
                {/* Close Button positioned at the top right */}
                <Box sx={UpdateAllWindowStyles.closeButtonContainer}>
                    <CloseButton text="" tooltip="Close" action={onClose}/>
                </Box>

                {/* Header and Body */}
                <Typography variant="h4">Update All Libraries</Typography>
                <Typography sx={{marginTop: "10px"}}>Do you want to proceed with updating all the libraries?
                    Remember, <span style={{ fontWeight: '800' , color: "red"}}>updating single libraries</span> is also possible via the filter
                    sidebar!</Typography>
                <Typography sx={{marginTop: "10px"}}>Choose the update step size:</Typography>

                {/* Dropdown Menu */}
                <FormControl sx={UpdateAllWindowStyles.dropdown}>
                    <InputLabel id="update-type-label">Update Type</InputLabel>
                    <Select
                        labelId="update-type-label"
                        value={updateType}
                        onChange={(e => setUpdateType(e.target.value))}
                        defaultValue="major"
                        variant="outlined"
                    >
                        <MenuItem value="major">Major</MenuItem>
                        <MenuItem value="minor">Minor</MenuItem>
                        <MenuItem value="patch">Patch</MenuItem>
                    </Select>
                </FormControl>

                {/* Dependency Update Button */}
                <Box sx={UpdateAllWindowStyles.buttonGroup}>
                    <DependencyUpdateButton text="Update" tooltip="Proceed with the update" action={() => {
                    }}/> {/*TODO action of updating tree*/}
                </Box>
            </Box>
        </Box>
    );
};

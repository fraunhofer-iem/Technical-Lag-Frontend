import React, {useState} from "react";
import {
    Box, Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    RadioGroup,
    Select, TextField,
    Typography,
    useTheme
} from "@mui/material";
import UpdateSingleWindowStyles from "./UpdateSingleWindowStyles.ts";
import CloseButton from "../../buttons/update_window_buttons/CloseButton.tsx";
import DependencyUpdateButton from "../../buttons/update_window_buttons/DependencyUpdateButton.tsx";

interface UpdateWindowProps {
    onClose: () => void;
}

export const UpdateSingleWindow: React.FC<UpdateWindowProps> = ({onClose}) => {
    const theme = useTheme();
    const [selectAllNodes, setSelectAllNodes] = useState(false);
    const [nodeInput, setNodeInput] = useState("");
    const [updateType, setUpdateType] = useState("major");

    const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setSelectAllNodes(checked);

        if (checked) {
            setNodeInput("");
        }
    };

    //TODO trigger opening of filtersidebar for nodesearch
    const handleNodeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNodeInput(value);
        if (value.trim().length > 0) {
            setSelectAllNodes(false); // Uncheck "Select All" if the text field has input
        }
    };

    return (
        <Box sx={UpdateSingleWindowStyles.overlay}>
            <Box sx={UpdateSingleWindowStyles.window(theme)}>
                {/* Close Button positioned at the top right */}
                <Box sx={UpdateSingleWindowStyles.closeButtonContainer}>
                    <CloseButton text="" tooltip="Close" action={onClose}/>
                </Box>

                {/* Header and Body */}
                <Typography variant="h4">Update Selected Libraries</Typography>
                <Typography sx={{marginTop: "10px"}}>Do you want to proceed with updating the selected libraries?
                    Remember, <span style={{fontWeight: '800', color: "red"}}>updating all libraries</span> at once is also
                    possible via the update button!</Typography>
                <Typography sx={{marginTop: "10px"}}>Choose the update step size:</Typography>

                {/* Checkbox and Text Field */}
                <FormControl sx={UpdateSingleWindowStyles.formControl}>
                    <RadioGroup
                        row
                        value={selectAllNodes ? "all" : "one"}
                        onChange={handleSelectAllChange}
                    >
                        <FormControlLabel
                            control={<Checkbox checked={selectAllNodes}
                                               onChange={handleSelectAllChange}
                                               color="primary"
                            />}
                            value="all"
                            label="Select all nodes"
                            labelPlacement="start"
                        />
                        <Box sx={{display: "flex", alignItems: "center", ml: 3}}>
                            <TextField
                                id="node-input"
                                value={nodeInput}
                                onChange={handleNodeInputChange}
                                disabled={selectAllNodes}
                                size="small"
                                label="Node:"
                                sx={UpdateSingleWindowStyles.textField}
                            /> TODO dropdown of all available nodes that match input
                        </Box>
                    </RadioGroup>
                </FormControl>

                {/* Dropdown Menu */}
                <FormControl sx={UpdateSingleWindowStyles.dropdown}>
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
                <Box sx={UpdateSingleWindowStyles.buttonGroup}>
                    <DependencyUpdateButton text="Update" tooltip="Proceed with the update" action={() => {
                    }}/> {/*TODO action of updating tree*/}
                </Box>
            </Box>
        </Box>
    );
};

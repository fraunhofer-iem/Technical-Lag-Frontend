import React, {useState} from "react";
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    RadioGroup,
    Select,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import UpdateWindowStyles from "./UpdateWindowStyles.ts";
import CloseButton from "../../buttons/update_window_buttons/CloseButton.tsx";
import DependencyUpdateButton from "../../buttons/update_window_buttons/DependencyUpdateButton.tsx";

interface UpdateWindowProps {
    onClose: () => void;
}

export const UpdateWindow: React.FC<UpdateWindowProps> = ({onClose}) => {
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

    const handleNodeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNodeInput(value);
        if (value.trim().length > 0) {
            setSelectAllNodes(false); // Uncheck "Select All" if the text field has input
        }
    };

    return (
        <Box sx={UpdateWindowStyles.overlay}>
            <Box sx={UpdateWindowStyles.window(theme)}>
                {/* Close Button positioned at the top right */}
                <Box sx={UpdateWindowStyles.closeButtonContainer}>
                    <CloseButton text="" tooltip="Close" action={onClose}/>
                </Box>

                {/* Header and Body */}
                <Typography variant="h4">Update Libraries</Typography>
                <Typography>Do you want to proceed with updating the libraries?</Typography>

                {/* Checkbox and Text Field */}
                <FormControl sx={UpdateWindowStyles.formControl}>
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
                                sx={UpdateWindowStyles.textField}
                            /> {/*TODO dropdown of all available nodes that match input*/}
                        </Box>
                    </RadioGroup>
                </FormControl>

                {/* Dropdown Menu */}
                <FormControl sx={UpdateWindowStyles.dropdown}>
                    <InputLabel id="update-type-label">Update Type</InputLabel>
                    <Select
                        labelId="update-type-label"
                        value={updateType}
                        onChange={(e => setUpdateType(e.target.value as string))}
                        defaultValue="major"
                        variant="outlined"
                    >
                        <MenuItem value="major">Major</MenuItem>
                        <MenuItem value="minor">Minor</MenuItem>
                        <MenuItem value="patch">Patch</MenuItem>
                    </Select>
                </FormControl>

                {/* Dependency Update Button */}
                <Box sx={UpdateWindowStyles.buttonGroup}>
                    <DependencyUpdateButton text="Update" tooltip="Proceed with the update" action={() => {}}/> {/*TODO action of updating tree*/}
                </Box>
            </Box>
        </Box>
    );
};

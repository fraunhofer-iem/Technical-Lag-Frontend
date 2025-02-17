import React, {useState} from "react";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Select,
    Typography,
    useTheme
} from "@mui/material";
import UpdateSingleWindowStyles from "./UpdateSingleWindowStyles.ts";
import CloseButton from "../../buttons/update_window_buttons/CloseButton.tsx";
import DependencyUpdateButton from "../../buttons/update_window_buttons/DependencyUpdateButton.tsx";

interface UpdateWindowProps {
    onClose: () => void;
    selectedItems: any[];
}

export const UpdateSingleWindow: React.FC<UpdateWindowProps> = ({onClose, selectedItems,}) => {
    const theme = useTheme();
    const [updateType, setUpdateType] = useState("major");
    const [localSelectedItems, setLocalSelectedItems] = useState(selectedItems);

    const handleDeleteItem = (result: any) => {
        setLocalSelectedItems((prevSelected) =>
            prevSelected.filter((item) => item !== result)
        );
    };

    const handleUpdate = () => {
        alert("Update button clicked!");
    };

    return (
        <Box sx={UpdateSingleWindowStyles.overlay}>
            <Box sx={UpdateSingleWindowStyles.window(theme)}>
                <Box sx={UpdateSingleWindowStyles.closeButtonContainer}>
                    <CloseButton text="" tooltip="Close" action={onClose}/>
                </Box>

                <Typography variant="h4">Update Selected Libraries</Typography>
                <Typography sx={{marginTop: "10px"}}>
                    Do you want to proceed with updating the selected libraries? Remember, <span
                    style={{fontWeight: '800', color: "red"}}>updating all the libraries</span> at once is also possible
                    via the update button!
                </Typography>
                <Typography sx={{marginTop: "10px"}}>Choose the update step size:</Typography>

                <FormControl sx={UpdateSingleWindowStyles.dropdown}>
                    <InputLabel id="update-type-label">Update Type</InputLabel>
                    <Select
                        labelId="update-type-label"
                        value={updateType}
                        onChange={(e) => setUpdateType(e.target.value)}
                        defaultValue="major"
                        variant="outlined"
                    >
                        <MenuItem value="major">Major</MenuItem>
                        <MenuItem value="minor">Minor</MenuItem>
                        <MenuItem value="patch">Patch</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={UpdateSingleWindowStyles.listContainer(theme)}>
                    <List sx={UpdateSingleWindowStyles.list}>
                        {localSelectedItems.map((result) => (
                            <ListItem key={result.id} sx={UpdateSingleWindowStyles.listItem(theme)}>
                                <Typography>{result.path[result.path.length - 1]}</Typography>
                                <Button onClick={() => handleDeleteItem(result)} color="error">
                                    Delete
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Box sx={UpdateSingleWindowStyles.buttonGroup}>
                    <DependencyUpdateButton text="Update" tooltip="Proceed with the update" action={handleUpdate}/>
                </Box>
            </Box>
        </Box>
    );
};

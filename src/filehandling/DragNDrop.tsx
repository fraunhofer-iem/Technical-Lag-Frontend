import React, {FC, useRef, useState} from "react";
import {faFile} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {DNDStyles} from "./DragNDropStyles.tsx";
import {Box, Typography, useTheme} from "@mui/material";

interface IFileDrop {
    onDrop: (files: File[]) => void;
    setIsFileDropped: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FileDrop: FC<IFileDrop> = ({onDrop, setIsFileDropped}) => {
    const [isFileDragOver, setIsFileDragOver] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const theme = useTheme();

    // Handle drag events
    const handleDrag = (event: React.DragEvent<HTMLDivElement>, isOver: boolean) => {
        event.preventDefault();
        setIsFileDragOver(isOver);
    };

    // Handle drop event
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsFileDragOver(false);
        const files = Array.from(event.dataTransfer.files);
        onDrop(files);
        setIsFileDropped(true); // Hide the FileDrop and show the tree
    };

    // Handle click on the drop area
    const handleClick = () => {
        fileInputRef.current?.click();
    };

    // Handle file change via file input
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        onDrop(files);
        setIsFileDropped(true); // Hide the FileDrop and show the tree
    };

    const dropAreaStyle = {
        ...DNDStyles.dragAndDropField,
        backgroundColor: isHovered || isFileDragOver ? theme.palette.primary.light : theme.palette.primary.main,
        fontWeight: isFileDragOver || isHovered ? "bold" : "normal",
        fontSize: isFileDragOver ? "24px" : isHovered ? "22px" : "20px",
    };

    return (
        <Box
            onDragOver={(e) => handleDrag(e, true)}
            onDragLeave={(e) => handleDrag(e, false)}
            onDrop={handleDrop}
            onClick={handleClick}
            tabIndex={0}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleClick();
                }
            }}
            style={dropAreaStyle}
        >
            <input
                type="file"
                ref={fileInputRef}
                style={{display: "none"}}
                onChange={handleFileChange}
            />
            <Typography variant="h6" color="inherit">
                {isFileDragOver ? "Drop!" : "Drag Files Here!"}
            </Typography>
            <Box sx={DNDStyles.icon}>
                <FontAwesomeIcon icon={faFile}/>
            </Box>
        </Box>
    );
};

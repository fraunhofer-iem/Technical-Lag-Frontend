import React, {FC, useRef, useState} from "react";
import {faFile} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import "../body/body.css";
import {DNDStyles} from "./DragNDropStyles.tsx";

interface IFileDrop {
    onDrop: (files: File[]) => void;
    setIsFileDropped: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FileDrop: FC<IFileDrop> = ({onDrop, setIsFileDropped}) => {
    const [isFileDragOver, setIsFileDragOver] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Handle drag over event
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsFileDragOver(true);
    };

    // Handle drag leave event
    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsFileDragOver(false);
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

    const notDroppedText = "Drop!";
    const droppedText = "Drag Files Here!";

    const dropAreaStyle = {
        ...DNDStyles.dragAndDropField,
        border: isFileDragOver || isHovered ? "3px solid var(--drop-border-hover)" : "5px solid var(--drop-border)",
        backgroundColor: isHovered || isFileDragOver ? "var(--drop-bg-hover)" : "var(--drop-bg)",
        color: isHovered || isFileDragOver ? "var(--drop-txt-hover)" : "var(--drop-txt-color)",
        fontWeight: isFileDragOver ? "bold" : (isHovered ? "bold" : "normal"),
        fontSize: isFileDragOver ? "24px" : (isHovered ? "22px" : "20px"),
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            role="button"
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
            <div>{isFileDragOver ? notDroppedText : droppedText}</div>
            <div style={DNDStyles.icon}><FontAwesomeIcon icon={faFile}/></div>
        </div>
    );
};

import React, { FC, useRef, useState } from "react";
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./dragndrop.css";

interface IFileDrop {
    onDrop: (files: File[]) => void;
    setIsFileDropped: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FileDrop: FC<IFileDrop> = ({ onDrop, setIsFileDropped }) => {
    const [dragIsOver, setDragIsOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // if the file is over the drop zone
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragIsOver(true);
    };

    // if the user leaves the drop zone with the file
    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragIsOver(false);
    };

    // if the user drops the file into the drop zone
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragIsOver(false);
        const files = Array.from(event.dataTransfer.files);
        onDrop(files);
        setIsFileDropped(true); // Hide the FileDrop and show the tree
    };

    // if the user clicks on the drop zone
    const handleClick = () => {
        fileInputRef.current?.click();
    };

    // if the user selects files using the file input
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        onDrop(files);
        setIsFileDropped(true); // Hide the FileDrop and show the tree
    };

    const notDroppedText = "Drop Files Here";
    const droppedText = "Drag & Drop Files Here";

    return (
        <div
            className="drag-n-drop"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleClick();
                }
            }}
            style={{
                border: dragIsOver ? "2px solid white" : "1px solid gray",
                outline: "none",
                cursor: "pointer",
            }}
        >
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <div>{dragIsOver ? notDroppedText : droppedText}</div>
            <div style={{ fontSize: '8em' }}><FontAwesomeIcon icon={faFile} /></div>
        </div>
    );
};

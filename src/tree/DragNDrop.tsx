import React, { FC, useState } from "react";
import {faFile} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import "./dragndrop.css";

interface IFileDrop {
    onDrop: (files: File[]) => void;
}

export const FileDrop: FC<IFileDrop> = ({ onDrop }) => {
    const [dragIsOver, setDragIsOver] = useState(false);

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
    };

    const notDroppedText = ["Drop files here\n", <FontAwesomeIcon icon={faFile}/>];
    const droppedText = ["Drag and drop files here\n", <FontAwesomeIcon icon={faFile}/>];
    return (
        <div
            className="drag-n-drop"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                border: dragIsOver? "2px solid white" : "1px solid gray",
                padding: 20,
                width: 400,
                height: 400,
            }}
        >
            {dragIsOver? notDroppedText : droppedText}
        </div>
    );
};
import React, {useEffect, useState} from 'react';
import StickyNoteComponent from '../footer/stickynote/StickyNoteComponent';
import {FileDrop} from './DragNDrop';
import {DragNDropStyles} from "./DragAndDropPageStyles.tsx";
import {parseJSON} from "../jsonutils/JSONParser.tsx";
import {Graph} from "../jsonutils/JSONStructureInterfaces.tsx";
import {useNavigate} from "react-router-dom";

const DragAndDropPage: React.FC = () => {
    const [isFileDropped, setIsFileDropped] = useState<boolean>(false);
    const [graphs, setGraphs] = React.useState<{ normalGraph: Graph, devGraph: Graph } | null>(null);
    const navigate = useNavigate();

    const handleFileDrop = (files: File[]) => {
        parseJSON(files, setGraphs, setIsFileDropped);
    };

    useEffect(() => {
        if (graphs) {
            navigate('/normal-dependencies-chart');
        }
    }, [graphs, navigate]); // Navigate when `graphs` is updated

    return (
        <div style={DragNDropStyles.container}>
            {!isFileDropped ? (
                <>
                    <StickyNoteComponent />
                    <h2 style={DragNDropStyles.description}>
                        For your project to be analysed, you have to upload your project files first.
                        Run the fitting toolkit to create a Software Bill of Materials for your project and then upload it here:
                    </h2>
                    <FileDrop onDrop={handleFileDrop} setIsFileDropped={setIsFileDropped} />
                    <p style={DragNDropStyles.requirements}> A file in JSON format is required!</p>
                </>
            ) : (
                <p style={DragNDropStyles.message}>Files have been dropped! Processing...</p>
            )}
        </div>
    );
};

export default DragAndDropPage;

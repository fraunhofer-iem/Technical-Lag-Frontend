import React, {useEffect, useState} from 'react';
import {FileDrop} from './DragNDrop';
import {DragNDropStyles} from "./DragAndDropPageStyles.tsx";
import {parseJSON} from "../jsonutils/JSONParser.tsx";
import {Graph} from "../jsonutils/JSONStructureInterfaces.tsx";
import {useNavigate} from "react-router-dom";
import {Typography} from "@mui/material";

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
                    <Typography variant="h3" style={DragNDropStyles.description}>
                        For your project to be analysed, you have to upload your project files first.
                        Run the fitting toolkit to create a Software Bill of Materials for your project and then upload it here:
                    </Typography>
                    <FileDrop onDrop={handleFileDrop} setIsFileDropped={setIsFileDropped} />
                    <Typography style={DragNDropStyles.requirements}> A file in JSON format is required!</Typography>
                </>
            ) : (
                <Typography style={DragNDropStyles.message}>Files have been dropped! Processing...</Typography>
            )}
        </div>
    );
};

export default DragAndDropPage;

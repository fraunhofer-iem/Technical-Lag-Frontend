import React, {useEffect, useState} from 'react';
import {FileDrop} from './DragNDrop.tsx';
import {DragNDropStyles} from "./DragAndDropPageStyles.ts";
import {parseJSON} from "../json_utils/JSONParser.tsx";
import {Graph} from "../json_utils/JSONStructureInterfaces.tsx";
import {useNavigate} from "react-router-dom";
import {Typography} from "@mui/material";
import ParticlesTheme from "../../themes_and_colors/ParticlesTheme.tsx";

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
    }, [graphs, navigate]);

    return (
        <div style={DragNDropStyles.container}>
            <ParticlesTheme/>
            {!isFileDropped ? (
                <>
                    <Typography variant="h3" style={DragNDropStyles.description}>
                        For your project to be analysed, you have to upload your project files first.
                        Run the fitting toolkit to create a Software Bill of Materials for your project and then
                        upload it here:
                    </Typography>
                    <FileDrop onDrop={handleFileDrop} setIsFileDropped={setIsFileDropped}/>
                    <Typography style={DragNDropStyles.requirements}> A file in JSON format is
                        required!</Typography>
                    <Typography variant="body2" style={DragNDropStyles.footer}>
                        &copy; 2025 Technical Lag Analyzer. All rights reserved.
                    </Typography>
                </>
            ) : (
                <>
                    <Typography style={DragNDropStyles.description}>An Error has occured. Check file type and
                        structure!</Typography>
                    <FileDrop onDrop={handleFileDrop} setIsFileDropped={setIsFileDropped}/>
                    <Typography variant="body2" style={DragNDropStyles.footer}>
                        &copy; 2025 Technical Lag Analyzer. All rights reserved.
                    </Typography>
                </>
            )}
        </div>
    );
};

export default DragAndDropPage;

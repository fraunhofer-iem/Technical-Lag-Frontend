import * as React from "react";
import { useEffect, useState } from "react";
import { FileDrop } from "./filehandling/DragNDrop";
import "../buttons/button.css";
import "./body.css";
import "./filehandling/dragndrop.css";
import { JSONData } from "./tree/Types";
import CollapsibleTreeComponent from "./tree/CollapsibleTreeComponent";
import UpdateButton from "../buttons/UpdateButton";
import RevertButton from "../buttons/RevertButton";
import BackButton from "../buttons/BackButton";

const handleDrop = (files: File[], setJsonData: React.Dispatch<React.SetStateAction<JSONData | null>>, setIsFileDropped: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                setJsonData(json);
                setIsFileDropped(true); // Hide the FileDrop and show the tree
                sessionStorage.setItem("jsonData", JSON.stringify(json));
                sessionStorage.setItem("isFileDropped", "true");
            } catch (error) {
                if (error instanceof Error) {
                    alert("Error parsing JSON file: " + error.message);
                } else {
                    alert("An unknown error occurred.");
                }
            }
        };

        reader.onerror = () => {
            alert("Error reading file: " + reader.error?.message);
        };

        reader.readAsText(file);
    } else {
        alert("No files dropped");
    }
};

const Body: React.FC = () => {
    const [jsonData, setJsonData] = useState<JSONData | null>(null);
    const [isFileDropped, setIsFileDropped] = useState<boolean>(false);

    // so the tree still exists on a page reload, tree is deleted out of storage if tab is closed
    useEffect(() => {
        const storedJsonData = sessionStorage.getItem("jsonData");
        const storedIsFileDropped = sessionStorage.getItem("isFileDropped");

        if (storedJsonData) {
            setJsonData(JSON.parse(storedJsonData));
        }

        if (storedIsFileDropped === "true") {
            setIsFileDropped(true);
        }
    }, []);

    const handleBackButton = () => {
        setIsFileDropped(false);
        setJsonData(null);
        sessionStorage.removeItem("jsonData");
        sessionStorage.removeItem("isFileDropped");
    };

    return (
        <main className="main-container">
            <div className="tree-button-row">
                <BackButton text="New File" action={handleBackButton}/>
                <UpdateButton text="Calculate Updates" action={() => alert("Button clicked!")}/>
                <RevertButton text="Revert Updates" action={() => alert("Button clicked!")}/>
            </div>
            {!isFileDropped && (
                <div className="drag-n-drop-container">
                    <FileDrop onDrop={(files) => handleDrop(files, setJsonData, setIsFileDropped)} setIsFileDropped={setIsFileDropped} />
                </div>
            )}
            {isFileDropped && (
                <div className="collapsible-tree">
                    {jsonData && <CollapsibleTreeComponent jsonData={jsonData}/>}
                </div>
            )}
        </main>
    );
};

export default Body;

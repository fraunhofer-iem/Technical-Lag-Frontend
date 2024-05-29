import * as React from "react";
import {useEffect, useState} from "react";
import {FileDrop} from "../filehandling/DragNDrop.tsx";
import "../../buttons/button.css";
import "./body.css";
import "../filehandling/dragndrop.css";
import {JSONData} from "../tree/Types.tsx";
import CollapsibleTreeComponent from "../tree/CollapsibleTreeComponent.tsx";
import UpdateButton from "../../buttons/UpdateButton.tsx";
import RevertButton from "../../buttons/RevertButton.tsx";
import BackButton from "../../buttons/BackButton.tsx";
import {handleDrop} from "../filehandling/JSONUtil.tsx";
import Sidebar from "../tree/Sidebar/Sidebar.tsx";

const Body: React.FC = () => {
    const [jsonData, setJsonData] = useState<JSONData | null>(null);
    const [isFileDropped, setIsFileDropped] = useState<boolean>(false);
    const [selectedNodeName, setSelectedNodeName] = useState<string>('');
    const [selectedVersionNumber, setSelectedVersionNumber] = useState<string>('');
    const [selectedReleaseDate, setSelectedReleaseDate] = useState<string>('');
    const [selectedEcosystem, setSelectedEcosystem] = useState<string>(''); // Added state for ecosystem
    const [selectedOrtVersion, setSelectedOrtVersion] = useState<string>(''); // Added state for ORT version
    const [selectedJavaVersion, setSelectedJavaVersion] = useState<string>(''); // Added state for Java version
    const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

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

    useEffect(() => {
        if (selectedNodeName) {
            setIsSidebarVisible(true);
        }
    }, [selectedNodeName]);


    const handleCloseSidebar = () => {
        setSelectedNodeName('');
        setSelectedVersionNumber('');
        setSelectedReleaseDate('');
        setSelectedEcosystem('');
        setSelectedOrtVersion('');
        setSelectedJavaVersion('');
        setIsSidebarVisible(false);
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
                    <FileDrop onDrop={(files) => handleDrop(files, setJsonData, setIsFileDropped)}
                              setIsFileDropped={setIsFileDropped}/>
                </div>
            )}
            {isFileDropped && (
                <>
                    <div className="collapsible-tree">
                        {jsonData && (
                            <CollapsibleTreeComponent
                                jsonData={jsonData}
                                setSelectedNode={{
                                    name: setSelectedNodeName,
                                    versionNumber: setSelectedVersionNumber,
                                    releaseDate: setSelectedReleaseDate,
                                    ecosystem: setSelectedEcosystem,
                                    ortVersion: setSelectedOrtVersion,
                                    javaVersion: setSelectedJavaVersion
                                }}
                            />
                        )}
                    </div>
                    {isSidebarVisible && (
                        <Sidebar
                            fullName={selectedNodeName}
                            versionNumber={selectedVersionNumber}
                            releaseDate={selectedReleaseDate}
                            ecosystem={selectedEcosystem}
                            ortVersion={selectedOrtVersion}
                            javaVersion={selectedJavaVersion}
                            onClose={handleCloseSidebar}
                        />
                    )}
                </>
            )}
        </main>
    );
};

export default Body;

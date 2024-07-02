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
import {handleDrop} from "../../json/JSONUtil.tsx";
import Sidebar from "../tree/sidebar/Sidebar.tsx";
import NodeManager from "../tree/NodeManager.tsx";

const Body: React.FC = () => {
    const [jsonData, setJsonData] = useState<JSONData | null>(null);
    const [isFileDropped, setIsFileDropped] = useState<boolean>(false);

    const nodeManager = new NodeManager(); // Initialize NodeManager instance

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

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
        if (nodeManager.getState().selectedNodeName) {
            setIsSidebarVisible(true);
        }
    }, [nodeManager.getState().selectedNodeName]);


    const handleCloseSidebar = () => {
        nodeManager.resetState();
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
                                nodeManager={nodeManager}
                            />
                        )}
                    </div>
                    {isSidebarVisible && (
                        <Sidebar
                            fullName={nodeManager.getState().selectedNodeName}
                            versionNumber={nodeManager.getState().selectedNodeVersionNumber}
                            releaseDate={nodeManager.getState().selectedNodeReleaseDate}
                            ecosystem={nodeManager.getState().isRoot ? nodeManager.getState().appEcosystem : ''}
                            repoURL={nodeManager.getState().isRoot ? nodeManager.getState().appRepoURL : ''}
                            revision={nodeManager.getState().isRoot ? nodeManager.getState().appRevision : ''}
                            onClose={handleCloseSidebar}
                        />)}
                </>
            )}
        </main>
    );
};

export default Body;

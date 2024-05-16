import * as React from "react";
import UpdateButton from "../buttons/UpdateButton.tsx";
import RevertButton from "../buttons/RevertButton.tsx";
import {FileDrop} from "./DragNDrop.tsx";
import "../buttons/button.css";

const handleDrop = (files: File[]) => {
    alert("Files dropped: " + files); // TODO Activate the createTree function to create a tree out of the json file
};

const Body: React.FC = () => (
    <main className="main-container">
        <div className="tree-button-row">
            <UpdateButton text="Calculate Updates" action={() => alert("Button clicked!")}/>
            <RevertButton text="Revert Updates" action={() => alert("Button clicked!")}/>
        </div>
        <FileDrop onDrop={handleDrop}/>
        <div>

        </div>
    </main>
);

export default Body;
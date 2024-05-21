import * as React from "react";
import UpdateButton from "../buttons/UpdateButton.tsx";
import RevertButton from "../buttons/RevertButton.tsx";
import {FileDrop} from "./filehandling/DragNDrop.tsx";
import "../buttons/button.css";
import "./body.css";
import "./filehandling/dragndrop.css";

const handleDrop = (files: File[]) => {
    alert("bla" + files);
}


const Body: React.FC = () => (
    <main className="main-container">
        <div className="tree-button-row">
            <UpdateButton text="Calculate Updates" action={() => alert("Button clicked!")}/>
            <RevertButton text="Revert Updates" action={() => alert("Button clicked!")}/>
        </div>
        <div className="drag-n-drop-container">
            <FileDrop onDrop={handleDrop}/>
        </div>
    </main>
);

export default Body;
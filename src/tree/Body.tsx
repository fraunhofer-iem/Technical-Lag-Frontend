import * as React from "react";
import UpdateButton from "../buttons/UpdateButton.tsx";
import RevertButton from "../buttons/RevertButton.tsx";
import {FileDrop} from "./DragNDrop.tsx";
import "../buttons/button.css";
import "./body.css";
import "./dragndrop.css";
/*import chart from "./Tree.tsx";*/

/*const handleDrop = (files: File[]) => {
        // Assuming you have a function to read the JSON file
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const jsonData = JSON.parse(fileReader.result as string);
            chart(jsonData); // Call the createTree function with the JSON data
        };
        fileReader.readAsText(files[0]); // Read the first file as text
};*/
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
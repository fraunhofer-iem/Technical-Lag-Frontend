import UpdateButton from "../buttons/UpdateButton.tsx";
import RevertButton from "../buttons/RevertButton.tsx";
import * as React from "react";

const ModifiableChart: React.FC = () => {
    //Todo


    return (
        <main className="main-container">
            <div className="chart-button-row">
                <UpdateButton text="Calculate Updates" action={() => alert("Button clicked!")}/>
                <RevertButton text="Revert Updates" action={() => alert("Button clicked!")}/>
            </div>
        </main>
    );
}

export default ModifiableChart;

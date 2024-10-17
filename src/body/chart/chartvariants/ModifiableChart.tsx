import UpdateButton from "../../buttons/graphbuttons/UpdateButton.tsx";
import RevertButton from "../../buttons/graphbuttons/RevertButton.tsx";
import * as React from "react";

const ModifiableChart: React.FC = () => {
    //Todo Choose which chart version so normdep or devdep and then modify


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

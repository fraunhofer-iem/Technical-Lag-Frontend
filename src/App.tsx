import * as React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WelcomePage from './welcome/WelcomePage';
import DragAndDropPage from "./filehandling/DragAndDropPage.tsx";
import ToSPage from "./legalnotice/ToSPage.tsx";
import PrivacyPolicyPage from "./legalnotice/PrivacyPolicyPage.tsx";
import HelpPage from "./help/HelpPage.tsx";
import HelpButton from "./help/HelpButton.tsx";
import DarkModeButton from "./darkmode/DarkModeButton.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <HelpButton/>
            <Routes>
                <Route path="/" element={<WelcomePage/>}/>
                <Route path="/drag-n-drop" element={<DragAndDropPage/>}/>
                <Route path="/terms-of-service" element={<ToSPage/>}/>
                <Route path="/privacy-policy" element={<PrivacyPolicyPage/>}/>
{/*                <Route path="/tree-map" element={<TreeMapPage/>}/>*/}
                <Route path="/help" element={<HelpPage/>}/>
                {/*TODO Other routes*/}
            </Routes>
            <DarkModeButton/>
        </Router>
    );
};

export default App;

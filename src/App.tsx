import * as React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WelcomePage from './welcome/WelcomePage';
import DragAndDropPage from "./filehandling/DragAndDropPage.tsx";
import ToSPage from "./legalnotice/ToSPage.tsx";
import PrivacyPolicyPage from "./legalnotice/PrivacyPolicyPage.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage/>}/>
                <Route path="/drag-n-drop" element={<DragAndDropPage/>}/>
                <Route path="/terms-of-service" element={<ToSPage/>}/>
                <Route path="/privacy-policy" element={<PrivacyPolicyPage/>}/>
                //TODO
            </Routes>
        </Router>
    );
};

export default App;

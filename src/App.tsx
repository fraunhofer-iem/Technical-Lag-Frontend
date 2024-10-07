import * as React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import WelcomePage from './welcome/WelcomePage';
import DragAndDropPage from "./filehandling/DragAndDropPage.tsx";
import ToSPage from "./legalnotice/tos/ToSPage.tsx";
import PrivacyPolicyPage from "./legalnotice/privacypolicy/PrivacyPolicyPage.tsx";
import HelpPage from "./help/HelpPage.tsx";
import NormalDependenciesChart from "./body/chart/chartvariants/NormalDependenciesChart.tsx";
import DevDependenciesChart from "./body/chart/chartvariants/DevDependenciesChart.tsx";
import CookieConsent from "./legalnotice/cookies/CookieConstent.tsx";
import ResponsiveAppBar from "./appbar/ResponsiveAppBar.tsx";
import StickyNoteComponent from "./footer/stickynote/StickyNoteComponent.tsx";
import {ThemeProviderComponent} from "./darkmode/ThemeContext.tsx";


const App: React.FC = () => {
    return (
        <ThemeProviderComponent>
            <Router>
                <ResponsiveAppBar/>
                <Routes>
                    <Route path="/" element={<WelcomePage/>}/>
                    <Route path="/drag-n-drop" element={<DragAndDropPage/>}/>
                    <Route path="/terms-of-service" element={<ToSPage/>}/>
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage/>}/>
                    <Route path="/normal-dependencies-chart" element={<NormalDependenciesChart/>}/>
                    <Route path="/dev-dependencies-chart" element={<DevDependenciesChart/>}/>
                    <Route path="/help" element={<HelpPage/>}/>
                    {/*TODO Other routes*/}
                </Routes>
                <CookieConsent/>
                <StickyNoteComponent/>
            </Router>
        </ThemeProviderComponent>
    );
};

export default App;

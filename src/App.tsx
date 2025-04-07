import * as React from "react";
import {Route, Routes} from 'react-router-dom';
import WelcomePage from './welcome/WelcomePage';
import DragAndDropPage from "./file_handling/drag_n_drop/DragAndDropPage.tsx";
import ToSPage from "./legal_notice/tos/ToSPage.tsx";
import PrivacyPolicyPage from "./legal_notice/privacy_policy/PrivacyPolicyPage.tsx";
import HelpPage from "./help/HelpPage.tsx";
import ChartInit from "./body/chart/chart_variants/ChartInit.tsx";
import CookieConsent from "./legal_notice/cookies/CookieConstent.tsx";
import ResponsiveAppBar from "./appbar/ResponsiveAppBar.tsx";
import StickyNoteComponent from "./footer/stickynote/StickyNoteComponent.tsx";
import {ThemeProviderComponent} from "./themes_and_colors/ThemeContext.tsx";


const App: React.FC = () => {
    return (
            <ThemeProviderComponent>
                <ResponsiveAppBar/>
                <Routes>
                    <Route path="/" element={<WelcomePage/>}/>
                    <Route path="/drag-n-drop" element={<DragAndDropPage/>}/>
                    <Route path="/terms-of-service" element={<ToSPage/>}/>
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage/>}/>
                    <Route path="/normal-dependencies-chart" element={<ChartInit/>}/>
                    <Route path="/help" element={<HelpPage/>}/>
                </Routes>
                <CookieConsent/>
                <StickyNoteComponent/>
            </ThemeProviderComponent>
    );
};

export default App;

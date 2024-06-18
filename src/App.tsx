import * as React from "react";
import Header from "./header/Header.tsx";
import StickyNoteComponent from "./footer/stickynote/StickyNoteComponent.tsx";


const App: React.FC = () => {
    return (
        <>
            <Header/>
            <StickyNoteComponent/>
        </>
    );
};

export default App;
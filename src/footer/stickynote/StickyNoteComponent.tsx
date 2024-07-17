import { StickyNote, StickyNoteContainer } from "./StickyNoteStyles";
import Footer from '../Footer.tsx';
import React, {useState} from "react";

const StickyNoteComponent: React.FC = () => {
    const [isFooterOpen, setIsFooterOpen] = useState<boolean>(false);

    const toggleFooter = () => {
        setIsFooterOpen(!isFooterOpen);
    };

    return (
        <StickyNoteContainer $isfooteropen={isFooterOpen}>
            <StickyNote onClick={toggleFooter}>Legal Notice</StickyNote>
            <Footer isFooterOpen={isFooterOpen} />
        </StickyNoteContainer>
    );
};

export default StickyNoteComponent;

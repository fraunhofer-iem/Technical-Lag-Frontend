import { StickyNote, StickyNoteContainer } from "./StickyNoteStyles";
import Footer from '../Footer.tsx';
import React, {useState} from "react";
import {useLocation} from "react-router-dom";

const StickyNoteComponent: React.FC = () => {
    const [isFooterOpen, setIsFooterOpen] = useState<boolean>(false);
    const location = useLocation();

    const toggleFooter = () => {
        setIsFooterOpen(!isFooterOpen);
    };

    if (location.pathname === '/terms-of-service' || location.pathname === '/privacy-policy' || location.pathname === '/help') {
        return null;
    }

    return (
        <StickyNoteContainer $isfooteropen={isFooterOpen}>
            <StickyNote onClick={toggleFooter}>Legal Notice</StickyNote>
            <Footer isFooterOpen={isFooterOpen} />
        </StickyNoteContainer>
    );
};

export default StickyNoteComponent;

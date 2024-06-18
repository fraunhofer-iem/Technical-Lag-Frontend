import { StickyNote, StickyNoteContainer } from "./StickyNoteStyles";
import Footer from '../Footer.tsx';
import React, {useState} from "react";

const StickyNoteComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleFooter = () => {
        setIsOpen(!isOpen);
    };

    return (
        <StickyNoteContainer isOpen={isOpen}>
            <StickyNote onClick={toggleFooter}>Legal Notice</StickyNote>
            <Footer isOpen={isOpen} />
        </StickyNoteContainer>
    );
};

export default StickyNoteComponent;
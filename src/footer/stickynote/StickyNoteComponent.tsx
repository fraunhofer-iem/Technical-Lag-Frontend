import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Footer from '../Footer.tsx';
import { stickyNoteContainerStyle, stickyNoteStyle } from "./StickyNoteStyles";

const StickyNoteComponent: React.FC = () => {
    const [isFooterOpen, setIsFooterOpen] = useState<boolean>(false);
    const location = useLocation();

    // Toggles the footer visibility
    const toggleFooter = () => {
        setIsFooterOpen(!isFooterOpen);
    };

    // Do not render the sticky note if we're on certain pages
    if (location.pathname === '/terms-of-service' || location.pathname === '/privacy-policy' || location.pathname === '/help') {
        return null;
    }

    return (
        <>
            {/* Sticky Note */}
            <Box sx={stickyNoteContainerStyle(isFooterOpen)}>
                <Box
                    sx={stickyNoteStyle}
                    onClick={toggleFooter}
                >
                    <Typography>Legal Notice</Typography>
                </Box>
            </Box>

            {/* Footer */}
            <Footer isFooterOpen={isFooterOpen} />
        </>
    );
};

export default StickyNoteComponent;

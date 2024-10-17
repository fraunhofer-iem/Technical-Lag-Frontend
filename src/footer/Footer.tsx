import React, {useState} from "react";
import {Box, Container, Link as MUILink, Typography, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import {columnStyle, copyrightStyle, footerBoxStyle, footerContainerStyle, linkStyle, rowStyle,} from "./FooterStyles";

interface FooterProps {
    isFooterOpen: boolean;
}

const Footer: React.FC<FooterProps> = ({isFooterOpen}) => {
    const theme = useTheme();
    const [isTOSHovered, setIsTOSHovered] = useState(false);
    const [isPPHovered, setIsPPHovered] = useState(false);

    return (
        <Box sx={footerBoxStyle(isFooterOpen)}>
            <Container sx={footerContainerStyle}>
                {isFooterOpen && (
                    <Box sx={rowStyle}>
                        <Box sx={columnStyle}>
                            <Typography sx={copyrightStyle}>
                                &copy; Fraunhofer IEM. All rights reserved.
                            </Typography>
                        </Box>
                        <Box sx={columnStyle}>
                            <MUILink
                                component={Link}
                                to="/privacy-policy"
                                sx={linkStyle(isPPHovered, theme)}
                                onMouseEnter={() => setIsPPHovered(true)}
                                onMouseLeave={() => setIsPPHovered(false)}
                            >
                                Privacy Policy
                            </MUILink>
                        </Box>
                        <Box sx={columnStyle}>
                            <MUILink
                                component={Link}
                                to="/terms-of-service"
                                sx={linkStyle(isTOSHovered, theme)}
                                onMouseEnter={() => setIsTOSHovered(true)}
                                onMouseLeave={() => setIsTOSHovered(false)}
                            >
                                Terms of Service
                            </MUILink>
                        </Box>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Footer;

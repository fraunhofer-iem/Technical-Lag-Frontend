import {Box, Column, Copyright, FooterContainer, FooterLink, Row,} from "./FooterStyles";
import React from "react";
import {Link} from "react-router-dom";

interface FooterProps {
    isFooterOpen: boolean;
}

const Footer: React.FC<FooterProps> = ({isFooterOpen}) => {
    return (<Box $isfooteropen={isFooterOpen}>
            <FooterContainer $isfooteropen={isFooterOpen}>
                {isFooterOpen && (
                    <Row>
                        <Column>
                            <Copyright>&copy; Fraunhofer IEM. All rights reserved.</Copyright>
                        </Column>
                        <Column>
                            <FooterLink  as={Link} to="/privacy-policy">
                                Privacy Policy
                            </FooterLink>
                        </Column>
                        <Column>
                            <FooterLink as={Link} to="/terms-of-service">
                                Terms of Service
                            </FooterLink>
                        </Column>
                    </Row>
                )}
            </FooterContainer>
        </Box>
    );
}
export default Footer;

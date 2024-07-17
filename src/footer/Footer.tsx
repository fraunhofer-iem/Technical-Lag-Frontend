import {Box, Column, Copyright, FooterContainer, FooterLink, Row,} from "./FooterStyles";
import React from "react";

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
                            <FooterLink href="#">
                                Security Policy
                            </FooterLink>
                        </Column>
                        <Column>
                            <FooterLink href="#">
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

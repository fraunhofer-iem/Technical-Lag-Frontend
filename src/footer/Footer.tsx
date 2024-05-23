import {Box, Column, FooterContainer, FooterLink, Row,} from "./FooterStyles";

const Footer = () => {
    return (
        <Box>
            <FooterContainer>
                <Row>
                    <Column>
                        <p>&copy; Fraunhofer IEM. All rights reserved.</p>
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
            </FooterContainer>
        </Box>
    );
};
export default Footer;

import React from 'react';
import {ToSPageStyles} from "./TosPageStyles.tsx";
import {Box, Typography} from "@mui/material";

const TermsOfService: React.FC = () => {
    return (
        <Box style={ToSPageStyles.container}>
            <Typography variant="h1" style={ToSPageStyles.title}>Terms of Service</Typography>
            <Typography style={ToSPageStyles.description}>Last updated: September 1, 2024</Typography>
            <br/>
            <Typography variant="h2" style={ToSPageStyles.section}>1. Introduction</Typography>
            <Typography style={ToSPageStyles.description}>
                Welcome to our website. By accessing or using our website, you agree to comply with and be bound by
                these Terms of Service.
            </Typography>
            <br/>
            <Typography variant="h2" style={ToSPageStyles.section}>2. Use of the Website</Typography>
            <Typography style={ToSPageStyles.description}>
                You may use our website for lawful purposes only. You must not use the website in any way that causes,
                or may cause, damage to the website or impairment of the availability or accessibility of the website.
            </Typography>
            <br/>
            <Typography variant="h2" style={ToSPageStyles.section}>3. Intellectual Property Rights</Typography>
            <Typography style={ToSPageStyles.description}>
                The content, layout, design, data, and graphics on the website are protected by intellectual property
                laws and are the property of the website owner.
            </Typography>
            <br/>
            <Typography variant="h2" style={ToSPageStyles.section}>4. User Responsibilities</Typography>
            <Typography style={ToSPageStyles.description}>
                Users must not engage in any activity that is disruptive or damaging to the website or other users. You
                are responsible for maintaining the confidentiality of your account information.
            </Typography>
            <br/>
            <Typography variant="h2" style={ToSPageStyles.section}>5. Limitation of Liability</Typography>
            <Typography style={ToSPageStyles.description}>
                Our website is provided on an "as-is" basis. We do not warrant that the website will be available at all
                times or that it will be free from errors or viruses.
            </Typography>
            <br/>
            <Typography variant="h2" style={ToSPageStyles.section}>6. Changes to Terms</Typography>
            <Typography style={ToSPageStyles.description}>
                We may update these Terms of Service from time to time. You should review this page periodically to stay
                informed of any changes.
            </Typography>
            <br/>
            <Typography variant="h2" style={ToSPageStyles.section}>7. Contact Us</Typography>
            <Typography style={ToSPageStyles.description}>
                If you have any questions about these Terms of Service, please contact us at support@example.com.
            </Typography>
        </Box>
    );
};

export default TermsOfService;

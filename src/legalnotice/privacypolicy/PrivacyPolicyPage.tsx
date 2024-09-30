import React from 'react';
import {PPPStyles} from "./PrivacyPolicyPageStyles.tsx";
import {Box, Typography} from "@mui/material";

const PrivacyPolicy: React.FC = () => {
    return (
        <Box style={PPPStyles.container}>
            <Typography variant="h1" style={PPPStyles.title}>Privacy Policy</Typography>
            <Typography style={PPPStyles.description}>Last updated: September 1, 2024</Typography>
            <br/>
            <Typography variant="h2" style={PPPStyles.section}>1. Introduction</Typography>
            <Typography style={PPPStyles.description}>
                This Privacy Policy explains how we collect, use, and protect your personal information. We are
                committed to safeguarding your privacy and ensuring your data is handled responsibly.
            </Typography>
            <br/>
            <Typography variant="h2" style={PPPStyles.section}>2. Information We Collect</Typography>
            <Typography style={PPPStyles.description}>
                We collect personal information that you provide to us, such as your name, email address, and other
                contact details. We may also collect information about your use of our services.
            </Typography>
            <br/>
            <Typography variant="h2" style={PPPStyles.section}>3. How We Use Your Information</Typography>
            <Typography style={PPPStyles.description}>
                We use your information to provide and improve our services, communicate with you, and ensure compliance
                with our policies.
            </Typography>
            <br/>
            <Typography variant="h2" style={PPPStyles.section}>4. Data Sharing and Disclosure</Typography>
            <Typography style={PPPStyles.description}>
                We do not share your personal information with third parties except as required by law or with your
                consent.
            </Typography>
            <br/>
            <Typography variant="h2" style={PPPStyles.section}>5. Data Security</Typography>
            <Typography style={PPPStyles.description}>
                We implement appropriate security measures to protect your data from unauthorized access and misuse.
            </Typography>
            <br/>
            <Typography variant="h2" style={PPPStyles.section}>6. Your Rights</Typography>
            <Typography style={PPPStyles.description}>
                You have the right to access, correct, and delete your personal information. You may also object to the
                processing of your data in certain circumstances.
            </Typography>
            <br/>
            <Typography variant="h2" style={PPPStyles.section}>7. Changes to This Policy</Typography>
            <Typography style={PPPStyles.description}>
                We may update this Privacy Policy from time to time. We encourage you to review this page periodically
                to stay informed about how we are protecting your information.
            </Typography>
            <br/>
            <Typography variant="h2" style={PPPStyles.section}>8. Contact Us</Typography>
            <Typography style={PPPStyles.description}>
                If you have any questions or concerns about this Privacy Policy, please contact us at
                privacy@example.com.
            </Typography>
        </Box>
    );
};

export default PrivacyPolicy;

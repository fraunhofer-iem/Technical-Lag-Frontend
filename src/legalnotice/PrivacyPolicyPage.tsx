import React from 'react';
import {PPPStyles} from "./PrivacyPolicyPageStyles.tsx";

const PrivacyPolicy: React.FC = () => {
    return (
        <div style={PPPStyles.container}>
            <h1 style={PPPStyles.title}>Privacy Policy</h1>
            <p style={PPPStyles.description}>Last updated: September 1, 2024</p>
            <br/>
            <h2 style={PPPStyles.section}>1. Introduction</h2>
            <p style={PPPStyles.description}>
                This Privacy Policy explains how we collect, use, and protect your personal information. We are
                committed to safeguarding your privacy and ensuring your data is handled responsibly.
            </p>

            <h2 style={PPPStyles.section}>2. Information We Collect</h2>
            <p style={PPPStyles.description}>
                We collect personal information that you provide to us, such as your name, email address, and other
                contact details. We may also collect information about your use of our services.
            </p>

            <h2 style={PPPStyles.section}>3. How We Use Your Information</h2>
            <p style={PPPStyles.description}>
                We use your information to provide and improve our services, communicate with you, and ensure compliance
                with our policies.
            </p>

            <h2 style={PPPStyles.section}>4. Data Sharing and Disclosure</h2>
            <p style={PPPStyles.description}>
                We do not share your personal information with third parties except as required by law or with your
                consent.
            </p>

            <h2 style={PPPStyles.section}>5. Data Security</h2>
            <p style={PPPStyles.description}>
                We implement appropriate security measures to protect your data from unauthorized access and misuse.
            </p>

            <h2 style={PPPStyles.section}>6. Your Rights</h2>
            <p style={PPPStyles.description}>
                You have the right to access, correct, and delete your personal information. You may also object to the
                processing of your data in certain circumstances.
            </p>

            <h2 style={PPPStyles.section}>7. Changes to This Policy</h2>
            <p style={PPPStyles.description}>
                We may update this Privacy Policy from time to time. We encourage you to review this page periodically
                to stay informed about how we are protecting your information.
            </p>

            <h2 style={PPPStyles.section}>8. Contact Us</h2>
            <p style={PPPStyles.description}>
                If you have any questions or concerns about this Privacy Policy, please contact us at
                privacy@example.com.
            </p>
        </div>
    );
};

export default PrivacyPolicy;

import React, {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import {CookieConsentStyles} from './CookieStyles.tsx';
import {useButtonStyles} from "./useButtonStyles.ts";
import {Box, Button, ButtonGroup, Checkbox, FormControlLabel, FormGroup, Typography} from "@mui/material";

const CookieConsent: React.FC = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['userCookieConsent', 'analyticsCookies', 'marketingCookies']);
    const [showManageCookies, setShowManageCookies] = useState(false);
    const [cookiePreferences, setCookiePreferences] = useState({
        necessary: true, // Default required cookie
        analytics: false,
        marketing: false,
    });
    const [isConsentGiven, setIsConsentGiven] = useState(cookies.userCookieConsent !== undefined);

    // Use the custom hook for button styles and hover logic
    const {
        acceptButtonStyle,
        rejectButtonStyle,
        manageButtonStyle,
        saveButtonStyle,
        backButtonStyle,
        setIsAcceptButtonHovered,
        setIsRejectButtonHovered,
        setIsManageButtonHovered,
        setIsSaveButtonHovered,
        setIsBackButtonHovered,
    } = useButtonStyles();

    // Effect to update state when cookies change
    useEffect(() => {
        setCookiePreferences({
            necessary: true,
            analytics: cookies.analyticsCookies === 'enabled',
            marketing: cookies.marketingCookies === 'enabled',
        });
        setIsConsentGiven(cookies.userCookieConsent !== undefined);
    }, [cookies]);

    const handleAcceptCookies = () => {
        setCookie('userCookieConsent', 'accepted', {path: '/', maxAge: 3600 * 24 * 365});
        setCookie('analyticsCookies', 'enabled', {path: '/'});
        setCookie('marketingCookies', 'enabled', {path: '/'});
        closeConsentWindow();
    };

    const handleRejectCookies = () => {
        setCookie('userCookieConsent', 'rejected', {path: '/', maxAge: 3600 * 24 * 365});
        removeCookie('analyticsCookies');
        removeCookie('marketingCookies');
        closeConsentWindow();
    };

    const handleSaveSettings = () => {
        setCookie('userCookieConsent', 'custom', {path: '/', maxAge: 3600 * 24 * 365});
        if (cookiePreferences.analytics) setCookie('analyticsCookies', 'enabled', {path: '/'});
        else removeCookie('analyticsCookies');

        if (cookiePreferences.marketing) setCookie('marketingCookies', 'enabled', {path: '/'});
        else removeCookie('marketingCookies');

        closeManageCookies();
    };

    const openManageCookies = () => setShowManageCookies(true);
    const closeManageCookies = () => setShowManageCookies(false);
    const closeConsentWindow = () => setIsConsentGiven(true);

    return (
        <>
            {/* Main Cookie Consent Banner */}
            {!isConsentGiven && !showManageCookies && (
                <Box id="cookie-consent" style={CookieConsentStyles.cookieConsent}>
                    <Typography variant="h3" style={CookieConsentStyles.title}>We Use Cookies</Typography>
                    <Typography style={CookieConsentStyles.description}>
                        This website uses cookies to ensure you get the best experience. You can accept all cookies,
                        reject non-essential ones, or manage your preferences.
                    </Typography>
                    <ButtonGroup style={CookieConsentStyles.cookieButtons}>
                        <Button
                            style={manageButtonStyle}
                            onClick={openManageCookies}
                            onMouseEnter={() => setIsManageButtonHovered(true)}
                            onMouseLeave={() => setIsManageButtonHovered(false)}
                        >
                            Manage Cookies
                        </Button>
                        <Button
                            style={rejectButtonStyle}
                            onClick={handleRejectCookies}
                            onMouseEnter={() => setIsRejectButtonHovered(true)}
                            onMouseLeave={() => setIsRejectButtonHovered(false)}
                        >
                            Reject Cookies
                        </Button>
                        <Button
                            style={acceptButtonStyle}
                            onClick={handleAcceptCookies}
                            onMouseEnter={() => setIsAcceptButtonHovered(true)}
                            onMouseLeave={() => setIsAcceptButtonHovered(false)}
                        >
                            Accept Cookies
                        </Button>
                    </ButtonGroup>
                </Box>
            )}

            {/* Manage Cookies Window */}
            {showManageCookies && (
                <Box id="manage-cookies" style={CookieConsentStyles.manageCookies}>
                    <Typography variant="h3" style={CookieConsentStyles.title}>Manage Your Cookie
                        Preferences</Typography>
                    <FormGroup style={CookieConsentStyles.accordion}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked/>}
                            checked={cookiePreferences.necessary}
                            style={CookieConsentStyles.accordionItem}
                            disabled
                            required
                            label="Necessary Cookies"/>
                        <FormControlLabel
                            control={<Checkbox/>}
                            style={CookieConsentStyles.accordionItem}
                            checked={cookiePreferences.analytics}
                            onChange={() => setCookiePreferences((prev) => ({...prev, analytics: !prev.analytics}))}
                            label="Analytics Cookies"/>
                        <FormControlLabel
                            control={<Checkbox/>}
                            style={CookieConsentStyles.accordionItem}
                            checked={cookiePreferences.marketing}
                            onChange={() => setCookiePreferences((prev) => ({...prev, marketing: !prev.marketing}))}
                            label="Marketing Cookies"/>
                    </FormGroup>
                    <ButtonGroup style={CookieConsentStyles.manageButtonsContainer}>
                        <Button
                            style={backButtonStyle}
                            onClick={closeManageCookies}
                            onMouseEnter={() => setIsBackButtonHovered(true)}
                            onMouseLeave={() => setIsBackButtonHovered(false)}
                        >
                            Back
                        </Button>
                        <Button
                            style={saveButtonStyle}
                            onClick={handleSaveSettings}
                            onMouseEnter={() => setIsSaveButtonHovered(true)}
                            onMouseLeave={() => setIsSaveButtonHovered(false)}
                        >
                            Save Settings
                        </Button>

                    </ButtonGroup>
                </Box>
            )}
        </>
    );
};

export default CookieConsent;

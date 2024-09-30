import { useState } from 'react';
import { CookieConsentStyles } from './CookieStyles'; // Adjust the import path as needed

// Hook to manage button hover states and styles
export const useButtonStyles = () => {
    // Hover state for main consent buttons
    const [isAcceptButtonHovered, setIsAcceptButtonHovered] = useState(false);
    const [isRejectButtonHovered, setIsRejectButtonHovered] = useState(false);
    const [isManageButtonHovered, setIsManageButtonHovered] = useState(false);

    // Hover state for "Save" and "Back" buttons in the Manage Cookies window
    const [isSaveButtonHovered, setIsSaveButtonHovered] = useState(false);
    const [isBackButtonHovered, setIsBackButtonHovered] = useState(false);

    // Dynamic button styles based on hover state
    const getButtonStyle = (isHovered: boolean) => ({
        ...CookieConsentStyles.button,
        backgroundColor: isHovered ? 'var(--btn-bg-hover)' : 'var(--btn-bg)',
        color: isHovered ? 'var(--btn-txt-hover)' : 'var(--btn-txt-color)',
    });

    const acceptButtonStyle = getButtonStyle(isAcceptButtonHovered);
    const rejectButtonStyle = getButtonStyle(isRejectButtonHovered);
    const manageButtonStyle = getButtonStyle(isManageButtonHovered);
    const saveButtonStyle = getButtonStyle(isSaveButtonHovered);
    const backButtonStyle = getButtonStyle(isBackButtonHovered);

    return {
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
    };
};

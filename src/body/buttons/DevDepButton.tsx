import * as React from "react";
import {useState} from "react";
import "../body.css";
import {BodyStyles} from "../BodyStyles.tsx";
import {ButtonProps} from "./ButtonInterface.tsx";
import {Tooltip as ReactTooltip} from "react-tooltip";

const DevDepButton: React.FC<ButtonProps> = ({text, action, tooltip}) => {
    const [isDDButtonHovered, setIsDDButtonHovered] = useState<boolean>(false);

    const updateButtonStyle = {
        ...BodyStyles.chartButton,
        backgroundColor: isDDButtonHovered ? 'var(--graphbtns-bg-hover)' : 'var(--graphbtns-bg)',
        color: isDDButtonHovered ? 'var(--graphbtns-txt-hover)' : 'var(--graphbtns-txt-color)',
        fontWeight: isDDButtonHovered ? 'bold' : 'normal',
    };

    return (
        <div>
        <button
            type="button"
            style={updateButtonStyle}
            data-tooltip-content={tooltip}
            data-tooltip-id="devdep-button"
            onClick={action}
            onMouseEnter={() => setIsDDButtonHovered(true)}
            onMouseLeave={() => setIsDDButtonHovered(false)}
        >
            {text}
        </button>
            <ReactTooltip id="devdep-button" place="left" variant="info"/>
        </div>
    );
};
export default DevDepButton;

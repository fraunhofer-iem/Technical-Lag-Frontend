import * as React from "react";
import {useState} from "react";
import "../body.css";
import {BodyStyles} from "../BodyStyles.tsx";
import {ButtonProps} from "./ButtonInterface.tsx";
import {Tooltip as ReactTooltip} from "react-tooltip";

const NormDepButton: React.FC<ButtonProps> = ({text, action, tooltip}) => {
    const [isNDButtonHovered, setIsNDButtonHovered] = useState<boolean>(false);

    const updateButtonStyle = {
        ...BodyStyles.chartButton,
        backgroundColor: isNDButtonHovered ? 'var(--graphbtns-bg-hover)' : 'var(--graphbtns-bg)',
        color: isNDButtonHovered ? 'var(--graphbtns-txt-hover)' : 'var(--graphbtns-txt-color)',
        fontWeight: isNDButtonHovered ? 'bold' : 'normal',
    };

    return (
        <div>
            <button
                type="button"
                style={updateButtonStyle}
                data-tooltip-content={tooltip}
                data-tooltip-id="normdep-button"
                onClick={action}
                onMouseEnter={() => setIsNDButtonHovered(true)}
                onMouseLeave={() => setIsNDButtonHovered(false)}
            >
                {text}
            </button>
            <ReactTooltip id="normdep-button" place="left" variant="info"/>
        </div>
    );
};
export default NormDepButton;

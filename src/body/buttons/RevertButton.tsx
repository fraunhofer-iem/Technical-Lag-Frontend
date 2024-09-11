import * as React from "react";
import {useState} from "react";
import "../body.css";
import {BodyStyles} from "../BodyStyles.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateLeft} from "@fortawesome/free-solid-svg-icons";
import {ButtonProps} from "./ButtonInterface.tsx";
import {Tooltip as ReactTooltip} from "react-tooltip";


const RevertButton: React.FC<ButtonProps> = ({text, action, tooltip}) => {
    const [isRevButtonHovered, setIsRevButtonHovered] = useState<boolean>(false);

    const revButtonStyle = {
        ...BodyStyles.chartButton,
        backgroundColor: isRevButtonHovered ? 'var(--graphbtns-bg-hover)' : 'var(--graphbtns-bg)',
        color: isRevButtonHovered ? 'var(--graphbtns-txt-hover)' : 'var(--graphbtns-txt-color)',
        fontWeight: isRevButtonHovered ? 'bold' : 'normal',
    };

    return (
        <div>
            <button
                type="button"
                style={revButtonStyle}
                data-tooltip-content={tooltip}
                data-tooltip-id="revert-button"
                onClick={action}
                onMouseEnter={() => setIsRevButtonHovered(true)}
                onMouseLeave={() => setIsRevButtonHovered(false)}
            >
                {text}
                <FontAwesomeIcon icon={faRotateLeft}/>
            </button>
            <ReactTooltip id="revert-button" place="left" variant="info"/>
        </div>
    );
};

export default RevertButton;

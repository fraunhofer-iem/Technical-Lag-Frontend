import * as React from "react";
import {useState} from "react";
import "../body.css";
import {BodyStyles} from "../BodyStyles.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWrench} from "@fortawesome/free-solid-svg-icons";
import {ButtonProps} from "./ButtonInterface.tsx";
import {Tooltip as ReactTooltip} from 'react-tooltip'

const UpdateButton: React.FC<ButtonProps> = ({text, action, tooltip}) => {
    const [isUDButtonHovered, setIsUDButtonHovered] = useState<boolean>(false);

    const updateButtonStyle = {
        ...BodyStyles.chartButton,
        backgroundColor: isUDButtonHovered ? 'var(--graphbtns-bg-hover)' : 'var(--graphbtns-bg)',
        color: isUDButtonHovered ? 'var(--graphbtns-txt-hover)' : 'var(--graphbtns-txt-color)',
        fontWeight: isUDButtonHovered ? 'bold' : 'normal',
    };

    return (
        <div>
            <button
                type="button"
                style={updateButtonStyle}
                data-tooltip-content={tooltip}
                data-tooltip-id="update-button"
                onClick={action}
                onMouseEnter={() => setIsUDButtonHovered(true)}
                onMouseLeave={() => setIsUDButtonHovered(false)}
            >
                <FontAwesomeIcon icon={faWrench}/>
                {text}
            </button>
            <ReactTooltip id="update-button" place="left" variant="info" delayShow={12}/>
        </div>
    );
};
export default UpdateButton;

import * as React from "react";
import {useState} from "react";
import "../body.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {BodyStyles} from "../BodyStyles.tsx";
import {ButtonProps} from "./ButtonInterface.tsx";
import {Tooltip as ReactTooltip} from "react-tooltip";

const FilterButton: React.FC<ButtonProps> = ({text, action, tooltip}) => {
    const [isFilterButtonHovered, setIsFilterButtonHovered] = useState<boolean>(false);

    const filterButtonStyle = {
        ...BodyStyles.chartButton,
        backgroundColor: isFilterButtonHovered ? 'var(--graphbtns-bg-hover)' : 'var(--graphbtns-bg)',
        color: isFilterButtonHovered ? 'var(--graphbtns-txt-hover)' : 'var(--graphbtns-txt-color)',
        fontWeight: isFilterButtonHovered ? 'bold' : 'normal',
    };

    return (
        <div>
            <button
                type="button"
                style={filterButtonStyle}
                data-tooltip-content={tooltip}
                data-tooltip-id="filter-button"
                onClick={action}
                onMouseEnter={() => setIsFilterButtonHovered(true)}
                onMouseLeave={() => setIsFilterButtonHovered(false)}
            >
                <FontAwesomeIcon icon={faBars}/>
                {text}
            </button>
            <ReactTooltip id="filter-button" place="left" variant="info"/>
        </div>
    );
};

export default FilterButton;

import * as React from "react";
import "../body.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

interface ButtonProps {
    text: string;
    action?: () => void;
}

const FilterButton: React.FC<ButtonProps> = ({text, action}) => (
    <button
        type="button"
        className="chart-update-button"
        onClick={action}
    >
        <FontAwesomeIcon icon={faBars}/>
        &nbsp;
        {text}
    </button>
);

export default FilterButton;

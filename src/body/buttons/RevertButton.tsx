import * as React from "react";
import "../body.css";

interface ButtonProps {
    text: string;
    action?: () => void;
}

const RevertButton: React.FC<ButtonProps> = ({text, action}) => (
    <button
        type="button"
        className="chart-revert-button"
        onClick={action}
    >
        {text}
    </button>
);

export default RevertButton;

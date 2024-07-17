import * as React from "react";
import "../body.css";

interface ButtonProps {
    text: string;
    action?: () => void;
}

const BackButton: React.FC<ButtonProps> = ({ text, action }) => (
    <button
        type="button"
        className="chart-back-button"
        onClick={action}
    >
        {text}
    </button>
);

export default BackButton;

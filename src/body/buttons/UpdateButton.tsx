import * as React from "react";
import "../body.css";

interface ButtonProps {
    text: string;
    action?: () => void;
}

const UpdateButton: React.FC<ButtonProps> = ({ text, action }) => (
    <button
        type="button"
        className="chart-update-button"
        onClick={action}
    >
        {text}
    </button>
);

export default UpdateButton;

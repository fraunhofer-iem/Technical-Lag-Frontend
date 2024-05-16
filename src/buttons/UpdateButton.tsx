import * as React from "react";
import "./button.css";

interface ButtonProps {
    text: string;
    action?: () => void;
}

const UpdateButton: React.FC<ButtonProps> = ({ text, action }) => (
    <button
        type="button"
        className="tree-button"
        onClick={action}
    >
        {text}
    </button>
);

export default UpdateButton;
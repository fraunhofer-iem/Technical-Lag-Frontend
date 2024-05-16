import * as React from "react";
import "./button.css";

interface ButtonProps {
    text: string;
    action?: () => void;
}

const RevertButton: React.FC<ButtonProps> = ({text, action}) => (
        <button
            type="button"
            className="tree-button"
            onClick={action}
        >
            {text}
        </button>
);

export default RevertButton;
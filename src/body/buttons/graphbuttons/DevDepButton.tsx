import * as React from "react";
import {useState} from "react";
import {BodyStyles} from "../../BodyStyles.tsx";
import {ButtonProps} from "../buttonInterface.ts";
import {Button, Fade, Tooltip, useTheme} from "@mui/material";
import AddchartIcon from '@mui/icons-material/Addchart';

const DevDepButton: React.FC<ButtonProps> = ({text, action, tooltip}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const theme = useTheme();

    const updateButtonStyle = {
        ...BodyStyles.chartButton,
        backgroundColor: isHovered ? theme.palette.primary.light : theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    };

    return (
        <Tooltip title={tooltip} placement={"right"} arrow TransitionComponent={Fade} TransitionProps={{timeout: 600}}
                 PopperProps={{sx: {'& .MuiTooltip-tooltip': {padding: '10px', fontSize: "14px"},}}}>
            <Button
                style={updateButtonStyle}
                size="medium"
                variant="contained"
                onClick={action}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <AddchartIcon/>
                {text}
            </Button>
        </Tooltip>
    );
};
export default DevDepButton;

import * as React from "react";
import {useState} from "react";
import {ButtonProps} from "../buttonInterface.ts";
import {Button, Fade, Tooltip, useTheme} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import {ChartCloseButtonStyles} from "./ChartCloseButtonStyles.ts";

const ChartCloseButton: React.FC<ButtonProps> = ({text, action, tooltip}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const theme = useTheme();

    const chartButtonStyle = {
        ...ChartCloseButtonStyles.filterButton,
        backgroundColor: isHovered ? theme.palette.primary.light : theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    };

    return (
        <Tooltip title={tooltip} placement={"left"} arrow TransitionComponent={Fade} TransitionProps={{timeout: 600}}
                 PopperProps={{sx: {'& .MuiTooltip-tooltip': {padding: '10px', fontSize: "14px"},}}}>
            <Button
                style={chartButtonStyle}
                size="medium"
                variant="contained"
                onClick={action}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <InfoIcon/>
                {text}
            </Button>
        </Tooltip>
    );
};

export default ChartCloseButton;

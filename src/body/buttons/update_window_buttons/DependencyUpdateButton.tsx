import * as React from "react";
import {useState} from "react";
import {ButtonProps} from "../buttonInterface.ts";
import {Button, Fade, Tooltip, useTheme} from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import UpdateWindowStyles from "../../chart/chartupdates/UpdateWindowStyles.ts";

const DependencyUpdateButton: React.FC<ButtonProps> = ({text, action, tooltip}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const theme = useTheme();

    const dependencyButtonStyle = {
        ...UpdateWindowStyles.updateButton,
        backgroundColor: isHovered ? theme.palette.primary.light : theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    };

    return (
        <Tooltip title={tooltip} placement={"left"} arrow TransitionComponent={Fade} TransitionProps={{timeout: 600}}
                 PopperProps={{sx: {'& .MuiTooltip-tooltip': {padding: '10px', fontSize: "14px"},}}}>
            <Button
                style={dependencyButtonStyle}
                size="medium"
                variant="contained"
                onClick={action}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <DoubleArrowIcon/>
                {text}
            </Button>
        </Tooltip>
    );
};

export default DependencyUpdateButton;

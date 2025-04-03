import * as React from "react";
import {useState} from "react";
import {ButtonProps} from "../buttonInterface.ts";
import {Button, Fade, Tooltip, useTheme} from "@mui/material";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import UpdateAllWindowStyles from "../../chart/library_update_and_revert/UpdateAllWindowStyles.ts";
import {ThemeProviderComponent} from "../../../themes_and_colors/ThemeContext.tsx";

const DependencyUpdateButton: React.FC<ButtonProps> = ({text, action, tooltip}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const theme = useTheme();

    const dependencyButtonStyle = {
        ...UpdateAllWindowStyles.updateButton,
        backgroundColor: isHovered ? theme.palette.primary.light : theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    };

    return (
        <ThemeProviderComponent>
            <Tooltip title={tooltip} placement={"left"} arrow slots={{transition: Fade}} slotProps={{
                transition: {timeout: 600},
                popper: {sx: {'& .MuiTooltip-tooltip': {padding: '10px', fontSize: "14px"}}}
            }}>
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
        </ThemeProviderComponent>
    );
};

export default DependencyUpdateButton;

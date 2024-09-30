import * as React from "react";
import {useState} from "react";
import {BodyStyles} from "../BodyStyles.tsx";
import {ButtonProps} from "./buttonInterface.ts";
import {Fade, IconButton, Tooltip} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';

const FilterButton: React.FC<ButtonProps> = ({text, action, tooltip}) => {
    const [isFilterButtonHovered, setIsFilterButtonHovered] = useState<boolean>(false);

    const filterButtonStyle = {
        ...BodyStyles.chartButton,
        backgroundColor: isFilterButtonHovered ? 'var(--graphbtns-bg-hover)' : 'var(--graphbtns-bg)',
        color: isFilterButtonHovered ? 'var(--graphbtns-txt-hover)' : 'var(--graphbtns-txt-color)',
    };

    return (
        <Tooltip title={tooltip} placement={"right"} arrow TransitionComponent={Fade} TransitionProps={{timeout: 600}}
                 PopperProps={{sx: {'& .MuiTooltip-tooltip': {padding: '10px', fontSize: "14px"},}}}>
            <IconButton
                style={filterButtonStyle}
                size="medium"
                onClick={action}
                onMouseEnter={() => setIsFilterButtonHovered(true)}
                onMouseLeave={() => setIsFilterButtonHovered(false)}
            >
                <FilterListIcon />
                {text}
            </IconButton>
        </Tooltip>
    );
};

export default FilterButton;

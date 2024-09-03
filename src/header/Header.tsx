import * as React from "react";
import HeaderMenuTab from "./HeaderMenuTabProps.tsx";
import DependenciesChart from "../body/chart/chartvariants/DependenciesChart.tsx";
import ModifiableChart from "../body/chart/chartvariants/ModifiableChart.tsx";
import "./header.css";

const tabs = [
    {
        key: 'normdep',
        label: 'Dependency Treemap',
        content: <DependenciesChart/>,
    },
    {
        key: 'modifiablechart',
        label: 'Modify Chart',
        content: <ModifiableChart/>,
    },
];

const Header: React.FC = () => {
    return <HeaderMenuTab tabs={tabs}/>;
}

export default Header;

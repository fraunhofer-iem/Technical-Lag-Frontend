import * as React from "react";
import HeaderMenuTab from "./HeaderMenuTabProps.tsx";
import Chart from "../body/chart/Chart.tsx";
import ModifiableChart from "../body/chart/ModifiableChart.tsx";
import "./header.css";


const tabs = [
    {
        key: 'home',
        label: 'Home',
        content: <Chart/>,
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

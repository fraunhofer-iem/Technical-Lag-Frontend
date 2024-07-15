import * as React from "react";
import HeaderMenuTab from "./HeaderMenuTabProps.tsx";
import SearchBar from "./SearchBar.tsx";
import Chart from "../body/body/Chart.tsx";
import TestSunburst from "../body/body/TestSunburst.tsx";
import "./header.css";

const handleSearch = (query: string) => {
    console.log(`Searching for: ${query}`);
};

const tabs = [
    {
        key: 'home',
        label: 'Home',
        content: <Chart/>,
    },
    {
        key: 'search',
        label: 'Search',
        content: <SearchBar onSearch={handleSearch}/>,
    },
    {
        key: 'sunburst',
        label: 'Sunburst',
        content: <TestSunburst/>,
    },
];

const Header: React.FC = () => {
    return <HeaderMenuTab tabs={tabs}/>;
}

export default Header;

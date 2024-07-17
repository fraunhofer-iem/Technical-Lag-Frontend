import * as React from "react";
import HeaderMenuTab from "./HeaderMenuTabProps.tsx";
import SearchBar from "./SearchBar.tsx";
import Chart from "../body/chart/Chart.tsx";
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
];

const Header: React.FC = () => {
    return <HeaderMenuTab tabs={tabs}/>;
}

export default Header;

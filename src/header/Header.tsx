import * as React from "react";
import HeaderMenuTab from "./HeaderMenuTabProps.tsx";
import SearchBar from "./SearchBar.tsx";
import Body from "../tree/Body.tsx";
import "./header.css";
import TreeComponent from "../tree/Tree.tsx";
import treeData from "../assets/tree.data.json"

const handleSearch = (query: string) => {
    console.log(`Searching for: ${query}`);
};

const tabs = [
    {
        key: 'home',
        label: 'Home',
        content: <><Body/></>,
    },
    {
        key: 'search',
        label: 'Search',
        content: <><SearchBar onSearch={handleSearch}/></>,
    },
    {
        key: 'test',
        label: 'Test',
        content:
            <div>
                <TreeComponent jsonData={treeData}/>
            </div>,
    },
];

const Header: React.FC = () => {
    return <HeaderMenuTab tabs={tabs}/>;
}

export default Header;
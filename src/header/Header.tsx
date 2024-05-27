import * as React from "react";
import HeaderMenuTab from "./HeaderMenuTabProps.tsx";
import SearchBar from "./SearchBar.tsx";
import Body from "../body/body/Body.tsx";
import "./header.css";
import treeData from "../assets/tree.data.json"
import CollapsibleTreeComponent from "../body/tree/CollapsibleTreeComponent.tsx";
//import treeData from "../assets/1715692927515-dependencies-stats.json";

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
                <CollapsibleTreeComponent jsonData={treeData}/>
            </div>,
    },
];

const Header: React.FC = () => {
    return <HeaderMenuTab tabs={tabs}/>;
}

export default Header;
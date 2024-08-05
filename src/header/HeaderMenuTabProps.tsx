import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartBar, faWandMagicSparkles} from "@fortawesome/free-solid-svg-icons";

interface HeaderMenuTabProps {
    tabs: { key: string; label: string; content: React.ReactElement }[];
}

const HeaderMenuTab: React.FC<HeaderMenuTabProps> = ({tabs}) => {
    const [pageKey, setPageKey] = useState(tabs[0].key);

    const handleTabClick = (tabKey: string) => {
        setPageKey(tabKey);
    };

    return (
        <header>
            <div className="menu-tabs">
                {tabs.map((tab) => (
                    <button key={tab.key} className={pageKey === tab.key ? 'active' : ''}
                            onClick={() => handleTabClick(tab.key)}>
            <span className={`icon-text ${tab.key}`}>
              {tab.key === 'home' && <FontAwesomeIcon icon={faChartBar}/>}
                {tab.key === 'modifiablechart' && <FontAwesomeIcon icon={faWandMagicSparkles}/>}
                {tab.label}
            </span>
                    </button>
                ))}
            </div>
            <div className="menu-content">{tabs.find((tab) => tab.key === pageKey)?.content}</div>
        </header>
    );
};

export default HeaderMenuTab;

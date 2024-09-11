import React, {useState} from 'react';
import styles from "./FilterSidebarStyles.tsx";

interface SidebarProps {
    onClose: () => void;
    onSearch: (searchTerm: string) => void;
/*    onFilterChange: (filters: any) => void;*/
    searchResults: any[];
    onResultClick: (node: any) => void;
}

const FilterSidebar: React.FC<SidebarProps> = ({ onClose, onSearch, onResultClick, searchResults }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [versionNumber, setVersionNumber] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [libDays, setLibDays] = useState("");
    const [numberOfMissedReleases, setNumberOfMissedReleases] = useState("");
    const [releaseFrequency, setReleaseFrequency] = useState("");

    const handleSearch = () => {
        onSearch(searchTerm);
    };

/*    const handleFilterChange = () => {
        onFilterChange({
            versionNumber,
            releaseDate,
            libDays,
            numberOfMissedReleases,
            releaseFrequency,
        });
    };*/

    return (
        <div style={styles.sidebar}>
            <div style={styles.headerContainer}>
                <button onClick={onClose} style={styles.closeButton}>
                    <span style={{...styles.closeButtonBeforeAfter, ...styles.closeButtonBefore}}/>
                    <span style={{...styles.closeButtonBeforeAfter, ...styles.closeButtonAfter}}/>
                </button>
                <p style={styles.header}>Filter Options</p>
            </div>
            <hr style={styles.horizontalLine}/>
            <div style={styles.content}>
                <div style={styles.field}>
                    <label style={styles.label}>Search by Node Name<input type="text" value={searchTerm} placeholder="Search..."
                                                                          onChange={(e) => setSearchTerm(e.target.value)}
                                                                          style={styles.input}/></label>
                    <button onClick={handleSearch} style={styles.searchButton}>Search</button>
                </div>
                {searchResults.length > 0 && (
                    <ul style={styles.resultsList}>
                        {searchResults.map((result, index) => (
                            <li key={index} style={styles.resultItem} onClick={() => onResultClick(result)}>
                                {["..", ...result.path.slice(1)].join(" / ")}
                            </li>
                        ))}
                    </ul>
                )}
                <div style={styles.field}>
                    <label style={styles.label}>Version Number<input type="text" value={versionNumber}
                                                                     onChange={(e) => setVersionNumber(e.target.value)}
                                                                     style={styles.input}/></label>
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Release Date<input type="date" value={releaseDate}
                                                                   onChange={(e) => setReleaseDate(e.target.value)}
                                                                   style={styles.input}/></label>
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Lib Days<input type="number" value={libDays}
                                                               onChange={(e) => setLibDays(e.target.value)}
                                                               style={styles.input}/></label>
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Number of Missed Releases<input type="number"
                                                                                value={numberOfMissedReleases}
                                                                                onChange={(e) => setNumberOfMissedReleases(e.target.value)}
                                                                                style={styles.input}/></label>
                </div>
                <div style={styles.field}>
                    <label style={styles.label}>Release Frequency<input type="number" value={releaseFrequency}
                                                                        onChange={(e) => setReleaseFrequency(e.target.value)}
                                                                        style={styles.input}/></label>
                </div>
{/*                <button onClick={handleFilterChange} style={styles.applyButton}>Apply Filters</button>*/}
            </div>
        </div>
    );
};

export default FilterSidebar;

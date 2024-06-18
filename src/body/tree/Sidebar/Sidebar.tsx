import React from 'react';
import './sidebar.css';

interface SidebarProps {
    fullName: string;
    versionNumber: string;
    releaseDate: string;
    onClose: () => void;
    ecosystem?: string;
    ortVersion?: string;
    javaVersion?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ fullName, versionNumber, releaseDate, onClose, ecosystem, ortVersion, javaVersion }) => {
    // Convert milliseconds to a Date object
    const formattedReleaseDate = !isNaN(parseInt(releaseDate))
        ? new Date(parseInt(releaseDate)).toLocaleString()
        : 'Invalid Date';

    return (
        <div className="sidebar">
            <button onClick={onClose} className="close-button"> X </button>
            <h2 className="header">Node Information</h2>
            <p className="paragraph"><strong className="label">Node:</strong> {fullName}</p>
            <p className="paragraph"><strong className="label">Version:</strong> {versionNumber}</p>
            <p className="paragraph"><strong className="label">Release Date:</strong> {formattedReleaseDate}</p>

            {/* Conditionally render additional info for the root node */}
            {ecosystem && (
                <>
                    <p className="paragraph"><strong className="label">Ecosystem:</strong> {ecosystem}</p>
                    <p className="paragraph"><strong className="label">ORT Version:</strong> {ortVersion}</p>
                    <p className="paragraph"><strong className="label">Java Version:</strong> {javaVersion}</p>
                </>
            )}
        </div>
    );
};

export default Sidebar;

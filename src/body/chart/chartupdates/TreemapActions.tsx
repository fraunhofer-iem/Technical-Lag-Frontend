import {useState} from 'react';

//TODO Insert actual logic for updating and reverting library upgrades
export const useTreemapActions = () => {
    const [isUpdateWindowVisible, setIsUpdateWindowVisible] = useState(false);

    const updateTreemap = () => {
        setIsUpdateWindowVisible(true);
    };

    const handleCloseUpdateWindow = () => {
        setIsUpdateWindowVisible(false);
    };

    return {isUpdateWindowVisible, updateTreemap, handleCloseUpdateWindow};
};

//TODO revert udpates
export const revertTreemap = (label: string): void => {
    alert(`Reverting Treemap with label: ${label}`); // Delete
    // Add logic here
};

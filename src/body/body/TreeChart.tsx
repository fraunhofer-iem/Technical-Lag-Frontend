import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {FileDrop} from "../filehandling/DragNDrop.tsx";
import "../../buttons/button.css";
import "./body.css";
import "../filehandling/dragndrop.css";
import {JSONData} from "../tree/Types.tsx";
import UpdateButton from "../../buttons/UpdateButton.tsx";
import RevertButton from "../../buttons/RevertButton.tsx";
import BackButton from "../../buttons/BackButton.tsx";
import {handleDrop} from "../../json/JSONUtil.tsx";
import Sidebar from "../tree/sidebar/Sidebar.tsx";
import NodeManager from "../tree/NodeManager.tsx";
import {createRoot} from "react-dom/client";
import * as echarts from 'echarts';


const TreeChart: React.FC = () => {
    const [jsonData, setJsonData] = React.useState<JSONData | null>(null);
    const [isFileDropped, setIsFileDropped] = useState<boolean>(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const nodeManager = new NodeManager();

    React.useEffect(() => {
        const storedJsonData = sessionStorage.getItem("jsonData");
        const storedIsFileDropped = sessionStorage.getItem("isFileDropped");

        if (storedJsonData && storedIsFileDropped === "true") {
            setJsonData(JSON.parse(storedJsonData));
            setIsFileDropped(true);
        }
    }, []);

    const handleBackButton = () => {
        setIsFileDropped(false);
        setJsonData(null);
        sessionStorage.removeItem("jsonData");
        sessionStorage.removeItem("isFileDropped");
    };

    useEffect(() => {
        if (nodeManager.getState().selectedNodeName) {
            setIsSidebarVisible(true);
        }
    }, [nodeManager.getState().selectedNodeName]);


    const handleCloseSidebar = () => {
        nodeManager.resetState();
        setIsSidebarVisible(false);
    };

    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (jsonData && chartRef.current) {
            const chartInstance = echarts.init(chartRef.current);

            const option = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove',
                },
                series: [
                    {
                        type: 'tree',
                        data: [jsonData],

                        top: '1%',
                        left: '7%',
                        bottom: '1%',
                        right: '20%',

                        symbolSize: 7,
                        initialTreeDepth: 1,
                        roam:true,
                        label: {
                            position: 'left',
                            verticalAlign: 'middle',
                            align: 'right',
                            fontSize: 12,
                            distance:5,
                        },
                        leaves: {
                            label: {
                                position: 'right',
                                verticalAlign: 'middle',
                                align: 'left',
                            },
                        },

                        itemStyle: {
                            color: '#64ffd0',  // Color of the nodes
                            borderColor: '#ffffff',  // Border color of the nodes
                            borderWidth: 2,
                        },
                        lineStyle: {
                            color: '#ccc',  // Color of the edges
                            width: 1.5,
                            opacity: 0.5,
                        },

                        emphasis: {
                            focus: 'descendant',
                            itemStyle: {
                                color: '#427776',  // Color of the nodes when focused
                            },
                            lineStyle: {
                                color: '#838383',  // Color of the edges when focused
                            },
                        },

                        expandAndCollapse: true,
                        animationDuration: 550,
                        animationDurationUpdate: 750,
                    },
                ],
            };

            // Resize chart with window resize
            const resizeHandler = () => {
                if (chartInstance) {
                    chartInstance.resize();
                }
            };

            window.addEventListener('resize', resizeHandler);

            chartInstance.setOption(option);

            return () => {
                window.removeEventListener('resize', resizeHandler);
                chartInstance.dispose();
            };
        }
    }, [jsonData]);

    useEffect(() => {
        // Set initial size of chart
        const resizeHandler = () => {
            if (chartRef.current) {
                chartRef.current.style.width = `${window.innerWidth}px`;
                chartRef.current.style.height = `${window.innerHeight}px`;
            }
        };

        resizeHandler();

        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);


    return (
        <main className="main-container">
            <div className="tree-button-row">
                <BackButton text="New File" action={handleBackButton}/>
                <UpdateButton text="Calculate Updates" action={() => alert("Button clicked!")}/>
                <RevertButton text="Revert Updates" action={() => alert("Button clicked!")}/>
            </div>
            {!isFileDropped && (
                <div className="drag-n-drop-container">
                    <FileDrop
                        onDrop={(files) => handleDrop(files, setJsonData, setIsFileDropped)}
                        setIsFileDropped={setIsFileDropped}
                    />
                </div>
            )}
            {isFileDropped && (
                <>
                <div className="drag-n-drop-container" style={{ width: '100%', height: '100vh' }}>
                    {!isFileDropped ? (
                        <div>
                            <FileDrop onDrop={(files) => handleDrop(files, setJsonData, setIsFileDropped)}
                                      setIsFileDropped={setIsFileDropped}/>
                        </div>
                    ) : (
                        <div className="drag-n-drop-container" ref={chartRef} style={{width: '100%', height: '100%'}}/>
                    )}
                </div>
                    {isSidebarVisible && (
                        <Sidebar
                            fullName={nodeManager.getState().selectedNodeName}
                            versionNumber={nodeManager.getState().selectedNodeVersionNumber}
                            releaseDate={nodeManager.getState().selectedNodeReleaseDate}
                            ecosystem={nodeManager.getState().isRoot ? nodeManager.getState().appEcosystem : ''}
                            repoURL={nodeManager.getState().isRoot ? nodeManager.getState().appRepoURL : ''}
                            revision={nodeManager.getState().isRoot ? nodeManager.getState().appRevision : ''}
                            onClose={handleCloseSidebar}
                        />)}

                </>
            )}
        </main>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<TreeChart/>);
} else {
    console.error('Root container not found');
}
export default TreeChart;

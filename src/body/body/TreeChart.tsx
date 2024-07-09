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
    const chartInstance = useRef<echarts.ECharts>();

    useEffect(() => {
        // Initialize chart instance
        if (chartRef.current) {
            chartInstance.current = echarts.init(chartRef.current);
        }

        // Initialize chart size
        const resizeHandler = () => {
            if (chartInstance.current && jsonData) {
                const width = window.innerWidth * 0.9; // 80% of window width
                const height = window.innerHeight * 0.9; // 60% of window height
                chartInstance.current.resize({ width, height });
            }
        };

        // Handle resize events
        window.addEventListener('resize', resizeHandler);
        resizeHandler(); // Initial resize

        return () => {
            window.removeEventListener('resize', resizeHandler);
            if (chartInstance.current) {
                chartInstance.current.dispose();
            }
        };
    }, [jsonData]);

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

                        top: '10%',
                        left: '10%',
                        bottom: '10%',
                        right: '10%',

                        symbolSize: 7,
                        initialTreeDepth: 1,
                        roam: true,

                        label: {
                            show: true,
                            position: 'left',
                            align: 'right',
                            lineHeight: 20,
                            fontSize: 12,
                            distance: 5,
                            color: '#ffffff',
                            font:{
                                family: 'Arial, sans-serif',
                                weight: 'bold',
                                style: 'normal',
                            },

                            shadow: {
                                color: 'rgba(204,204,204, 0.5)',
                                blur: 2,
                                offsetX: 1,
                                offsetY: 1
                            }
                        },

                        leaves: {
                            itemStyle: {
                                color: '#64ffd0',
                                borderColor: '#ffffff',
                                borderWidth: 2,
                            },
                            label: {
                                show: true,
                                position: 'right',
                                align: 'left',
                                lineHeight: 20,
                                distance: 5,
                                color: '#ffffff',

                                font:{
                                    family: 'Arial, sans-serif',
                                    weight: 'bold',
                                    style: 'normal',
                                },

                                shadowColor: 'rgba(204,204,204, 0.5)', // shadow color
                                shadowBlur: 5, // shadow blur radius
                                shadowOffsetX: 1, // shadow offset x
                                shadowOffsetY: 1, // shadow offset y
                            }
                        },

                        itemStyle: {
                            color: '#64ffd0',
                            borderColor: '#ffffff',
                            borderWidth: 2,
                        },
                        lineStyle: {
                            color: '#ccc',
                            width: 1.5,
                            opacity: 0.6,
                        },

                        emphasis: {
                            focus: 'descendant',
                            itemStyle: {
                                color: '#264241',  // Color of the nodes when focused
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
                    const width = window.innerWidth * 0.9;
                    const height = window.innerHeight * 0.9;
                    chartInstance.resize({ width, height });
                }
            };

            window.addEventListener('resize', resizeHandler);
            resizeHandler(); // Initial resize

            chartInstance.setOption(option);

            // Add zoomEnd event listener
            chartInstance.on('zoomEnd', (params: any) => {
                const zoomLevel = params.zoom;
                const labelFontSize = getLabelFontSize(zoomLevel); // calculate font size based on zoom level
                updateLabelFontSize(chartInstance, labelFontSize);
            });

            return () => {
                window.removeEventListener('resize', resizeHandler);
                chartInstance.dispose();
            };
        }
    }, [jsonData]);

    // Helper function to calculate label font size based on zoom level
    function getLabelFontSize(zoomLevel: number) {
        // You can adjust this logic to fit your needs
        if (zoomLevel < 0.5) {
            return 1;
        } else if (zoomLevel < 1) {
            return 5;
        } else if (zoomLevel < 2) {
            return 20;
        } else {
            return 50;
        }
    }

    function updateLabelFontSize(chartInstance: echarts.ECharts, fontSize: number) {
        chartInstance.setOption({
            series: [
                {
                    label: {
                        fontSize,
                    },
                    leaves: {
                        label: {
                            fontSize,
                        },
                    },
                },
            ],
        });
    }

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
                    <div className="drag-n-drop-container" style={{width: '90vw', height: '90vh'}}>
                        {!isFileDropped ? (
                            <div>
                                <FileDrop onDrop={(files) => handleDrop(files, setJsonData, setIsFileDropped)}
                                          setIsFileDropped={setIsFileDropped}/>
                            </div>
                        ) : (
                            <div className="collapsible-tree" ref={chartRef}
                                 style={{width: '90%', height: '90%'}}/>
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

export default TreeChart;

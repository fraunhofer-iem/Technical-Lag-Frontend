import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {FileDrop} from "../filehandling/DragNDrop.tsx";
import "../body.css";
import {JSONData} from "../utils/Types.tsx";
import UpdateButton from "../buttons/UpdateButton.tsx";
import RevertButton from "../buttons/RevertButton.tsx";
import BackButton from "../buttons/BackButton.tsx";
import {handleDrop} from "../../json/JSONUtil.tsx";
import Sidebar from "../utils/Sidebar.tsx";
import * as echarts from 'echarts';


const Chart: React.FC = () => {
    const [jsonData, setJsonData] = React.useState<JSONData | null>(null);
    const [isFileDropped, setIsFileDropped] = useState<boolean>(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [sidebarData, setSidebarData] = useState<any>(null);

    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstanceRef = useRef<any>(null);

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


    const handleCloseSidebar = () => {
        setIsSidebarVisible(false);
        setSidebarData(null);
    };

    useEffect(() => {
        if (jsonData && chartRef.current) {
            console.log("jsonData is set:", jsonData);

            try {
                const chartInstance = echarts.init(chartRef.current);
                chartInstanceRef.current = chartInstance;

                const option = {
                    tooltip: {
                        formatter: function (info: any) {
                            const name = info.name;
                            const version = info.data.version;

                            return [
                                '<div class="tooltip-title">' +
                                echarts.format.encodeHTML(name) +
                                '</div>',
                                'Version: ' + version
                            ].join('');
                        }
                    },
                    color: ['#62a995'],
                    series: [{
                        type: 'treemap',
                        visibleMin: 300,
                        label: {
                            show: true,
                            formatter: '{b}',
                            color: '#000'
                        },
                        upperLabel: {
                            show: true,
                            height: 30,
                            color: '#000'
                        },
                        itemStyle: {
                            borderColor: '#7ed3c5',
                            borderWidth: 2,
                            gapWidth: 2
                        },
                        colorMappingBy: 'id',
                        levels: getLevelOption(),
                        data: [transformJSONDataToTreemap(jsonData)]
                    }]
                };

                chartInstance.setOption(option);
                console.log("Rendered chart");

                chartInstance.on('contextmenu', (params: any) => {
                    if (params.componentType === 'series' && params.seriesType === 'treemap') {
                        params.event.event.preventDefault();
                        const nodeData = params.data;
                        setSidebarData(nodeData);
                        setIsSidebarVisible(true);
                    }
                });

                const handleResize = () => {
                    chartInstance.resize();
                };

                window.addEventListener('resize', handleResize);

                return () => {
                    window.removeEventListener('resize', handleResize);
                    chartInstance.dispose();
                };
            } catch (error) {
                console.error("Error initializing the chart:", error);
            }
        } else {
            console.log("jsonData or chartRef.current is null");
        }
    }, [jsonData]);

    // Helper function to transform JSONData to ECharts treemap data format
    const transformJSONDataToTreemap = (data: JSONData): any => {
        return {
            name: data.name,
            value: 1, // Placeholder value, adjust according to your data structure
            version: data.version,
            releaseDate: data.releaseDate,
            ecosystem: data.ecosystem,
            repoURL: data.repoURL,
            revision: data.revision,
            stats: data.stats,
            children: data.children?.map(child => transformJSONDataToTreemap(child))
        };
    };


    // Function to generate levels option for treemap
    const getLevelOption = () => {
        return [
            {
                itemStyle: {
                    borderColor: '#777',
                    borderWidth: 0,
                    gapWidth: 1,
                },
                upperLabel: {
                    show: false
                }
            },
            {
                itemStyle: {
                    borderColor: '#555',
                    borderWidth: 5,
                    gapWidth: 1,
                },
                emphasis: {
                    itemStyle: {
                        borderColor: '#ddd'
                    }
                }
            },
            {
                colorSaturation: [0.35, 0.5],
                itemStyle: {
                    borderWidth: 5,
                    gapWidth: 1,
                    borderColorSaturation: 0.6,
                }
            }
        ];
    };

    return (
        <main className="main-container">
            <div className="chart-button-row">
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
                    <div className="drag-n-drop-container"
                         style={{width: '95vw', height: '95vh'}}>
                        {!isFileDropped ? (
                            <div>
                                <FileDrop onDrop={(files) => handleDrop(files, setJsonData, setIsFileDropped)}
                                          setIsFileDropped={setIsFileDropped}/>
                            </div>
                        ) : (
                            <div className="chart" ref={chartRef}
                                 style={{width: '100%', height: '90%'}}/>
                        )}
                    </div>
                    {isSidebarVisible && (
                        <Sidebar
                            fullName={sidebarData.name}
                            versionNumber={sidebarData.version}
                            releaseDate={sidebarData.releaseDate}
                            ecosystem={sidebarData.name === jsonData?.name ? sidebarData.ecosystem : undefined}
                            repoURL={sidebarData.name === jsonData?.name ? sidebarData.repoURL : undefined}
                            revision={sidebarData.name === jsonData?.name ? sidebarData.revision : undefined}
                            stats={sidebarData.stats}
                            onClose={handleCloseSidebar}
                        />)}
                </>
            )}
        </main>
    );
};

export default Chart;

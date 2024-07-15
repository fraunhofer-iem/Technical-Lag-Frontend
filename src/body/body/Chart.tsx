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


const Chart: React.FC = () => {
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
            console.log("jsonData is set:", jsonData);

            const container = chartRef.current;
            console.log("Container dimensions:", container.clientWidth, container.clientHeight);

            try {
                const chartInstance = echarts.init(chartRef.current);

                const option = {
                    series: [
                        {
                            type: 'tree',
                            data: [jsonData],
                            top: '18%',
                            roam: true,
                            bottom: '14%',
                            layout: 'radial',
                            symbol: 'emptyCircle',
                            symbolSize: 1,
                            initialTreeDepth: 1,
                            animationDurationUpdate: 750,

                            emphasis: {
                                focus: 'descendant'
                            },
                            tooltip:{
                               trigger: "item",
                               triggerOn: "mousemove",
                            }
                        }
                    ]
                };

                chartInstance.setOption(option);
                console.log("Chart option:", option);
                console.log("Rendered chart");

                return () => {
                    chartInstance.dispose();
                };
            } catch (error) {
                console.error("Error initializing the chart:", error);
            }
        } else {
            console.log("jsonData or chartRef.current is null");
        }
    }, [jsonData]);

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
                    <div className="drag-n-drop-container" style={{width: '90vw', height: '90vh', border: '1px solid red' }}>
                        {!isFileDropped ? (
                            <div>
                                <FileDrop onDrop={(files) => handleDrop(files, setJsonData, setIsFileDropped)}
                                          setIsFileDropped={setIsFileDropped}/>
                            </div>
                        ) : (
                            <div className="chart" ref={chartRef}
                                 style={{width: '90%', height: '90%', border: '1px solid red' }}/>
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

export default Chart;
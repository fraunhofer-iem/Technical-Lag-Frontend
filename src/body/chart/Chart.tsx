import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {FileDrop} from "../filehandling/DragNDrop.tsx";
import "../body.css";
import {JSONData} from "../utils/Types.tsx";
import BackButton from "../buttons/BackButton.tsx";
import {handleDrop} from "../../json/JSONUtil.tsx";
import ChartSidebar from "../utils/chartsidebar/ChartSidebar.tsx";
import FilterButton from "../buttons/FilterButton.tsx";
import FilterSidebar from "../utils/filtersidebar/FilterSidebar.tsx";
import {initChart} from "./ChartTreeMap.tsx";
import {useChartSidebar} from "./sidebars/ChartSidebarUtils.tsx";
import {useFilterSidebar} from "./sidebars/FilterSidebarUtils.tsx";
import * as echarts from 'echarts';


const Chart: React.FC = () => {
    const [jsonData, setJsonData] = React.useState<JSONData | null>(null);
    const [isFileDropped, setIsFileDropped] = useState<boolean>(false);

    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstanceRef = useRef<echarts.ECharts | null>(null);

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

    const {
        isChartSidebarVisible,
        chartSidebarData,
        setChartSidebarData,
        setIsChartSidebarVisible,
        handleCloseChartSidebar,
    } = useChartSidebar();

    const {
        isFilterSidebarVisible,
        searchResults,
        handleFilterButton,
        handleSearch,
        zoomToNode,
        handleCloseFilterSidebar,
    } = useFilterSidebar(jsonData, chartInstanceRef);

    useEffect(() => {
        if (jsonData && chartRef.current) {
            console.log("jsonData is set:", jsonData);

            chartInstanceRef.current = initChart(
                chartRef.current,
                jsonData,
                setChartSidebarData,
                setIsChartSidebarVisible
            );

            const handleResize = () => {
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.resize();
                }
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                if (chartInstanceRef.current) {
                    chartInstanceRef.current.dispose();
                    chartInstanceRef.current = null;
                }
            };
        }
    }, [jsonData]);

    return (
        <main className="main-container">
            <div className="chart-button-row">
                <BackButton text="New File" action={handleBackButton}/>
                <FilterButton text="Filter" action={handleFilterButton}/>
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
                    {isChartSidebarVisible && (
                        <ChartSidebar
                            fullName={chartSidebarData?.name || ""}
                            versionNumber={chartSidebarData?.version || ""}
                            releaseDate={chartSidebarData?.releaseDate || ""}
                            ecosystem={chartSidebarData?.name === jsonData?.name ? chartSidebarData?.ecosystem : undefined}
                            repoURL={chartSidebarData?.name === jsonData?.name ? chartSidebarData?.repoURL : undefined}
                            revision={chartSidebarData?.name === jsonData?.name ? chartSidebarData?.revision : undefined}
                            stats={chartSidebarData?.stats}
                            onClose={handleCloseChartSidebar}
                        />)}
                    {isFilterSidebarVisible && (
                        <FilterSidebar
                            onClose={handleCloseFilterSidebar}
                            onSearch={handleSearch}
                            searchResults={searchResults}
                            onResultClick={(node) => zoomToNode(node)}
                        />)}
                </>
            )}
        </main>
    );
};

export default Chart;

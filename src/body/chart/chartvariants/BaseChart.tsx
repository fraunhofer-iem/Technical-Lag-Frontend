import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {Graph, Node} from "../../../filehandling/jsonutils/JSONStructureInterfaces.tsx";
import NewFileButton from "../../buttons/NewFileButton.tsx";
import FilterButton from "../../buttons/filterbutton/FilterButton.tsx";
import FilterSidebar from "../../sidebars/filtersidebar/FilterSidebar.tsx";
import {ChartSidebarData, useChartSidebar} from "../../sidebars/sidebarutils/ChartSidebarUtils.tsx";
import {useFilterSidebar} from "../../sidebars/sidebarutils/FilterSidebarUtils.tsx";
import * as echarts from 'echarts';
import {useNavigate} from "react-router-dom";
import UpdateButton from "../../buttons/graphbuttons/UpdateButton.tsx";
import RevertButton from "../../buttons/graphbuttons/RevertButton.tsx";
import {BodyStyles} from "../../BodyStyles.tsx";
import NormDepButton from "../../buttons/graphbuttons/NormDepButton.tsx";
import DevDepButton from "../../buttons/graphbuttons/DevDepButton.tsx";
import {Box, ButtonGroup} from "@mui/material";
import ChartSidebar from "../../sidebars/chartsidebar/ChartSidebar.tsx";
import {filterContainerStyle} from "../../buttons/filterbutton/FilterButtonStyles.ts";

interface BaseChartProps {
    initChart: (
        ref: HTMLDivElement,
        graph: Graph,
        setChartSidebarData: React.Dispatch<React.SetStateAction<ChartSidebarData | null>>,
        setIsChartSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>) => echarts.ECharts | null;
    chartClassName: 'normalGraph' | 'devGraph';
}

const BaseChart: React.FC<BaseChartProps> = ({initChart, chartClassName}) => {
    const [graphs, setGraphs] = React.useState<{ normalGraph: Graph, devGraph: Graph } | null>(null);
    const [isFileDropped, setIsFileDropped] = useState<boolean>(false);
    const [currentGraph, setCurrentGraph] = useState<Graph | null>(null);

    const navigate = useNavigate();
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstanceRef = useRef<echarts.ECharts | null>(null);

    const handleBackButton = () => {
        setIsFileDropped(false);
        setGraphs(null);
        sessionStorage.removeItem("normalGraph");
        sessionStorage.removeItem("devGraph");
        sessionStorage.removeItem("isFileDropped");
        navigate('/drag-n-drop');
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
        handleCloseFilterSidebar,
    } = useFilterSidebar(currentGraph);

    // Updates the ChartSidebar when a node is clicked in the FilterSidebar search list
    const handleNodeClickInFilterSidebar = (node: Node) => {
        // Set data for ChartSidebar based on the node clicked
        setChartSidebarData({
            name: node.nodeName,
            usedVersion: node.usedVersion,
            releaseDate: node.releaseDate.toString(),
            stats: node.stats,
        });

        // Display the ChartSidebar with node data
        setIsChartSidebarVisible(true);
    };

    useEffect(() => {
        const storedNormalGraph = sessionStorage.getItem("normalGraph");
        const storedDevGraph = sessionStorage.getItem("devGraph");
        const storedIsFileDropped = sessionStorage.getItem("isFileDropped");

        if (storedNormalGraph && storedDevGraph && storedIsFileDropped === "true") {
            const parsedNormalGraph = JSON.parse(storedNormalGraph);
            const parsedDevGraph = JSON.parse(storedDevGraph);
            setGraphs({
                normalGraph: parsedNormalGraph,
                devGraph: parsedDevGraph,
            });
            setIsFileDropped(true);
            setCurrentGraph(parsedNormalGraph);
        }
    }, []);

    useEffect(() => {
        if (currentGraph && chartRef.current) {
            chartInstanceRef.current = initChart(
                chartRef.current,
                currentGraph,
                setChartSidebarData,
                setIsChartSidebarVisible
            );


            const handleResize = () => {
                chartInstanceRef.current?.resize();
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                chartInstanceRef.current?.dispose();
                chartInstanceRef.current = null;
            };
        }
    }, [currentGraph, isFilterSidebarVisible]);

    const handleGraphSelection = (graphType: 'normalGraph' | 'devGraph') => {
        if (graphs) {
            const selectedGraph = graphType === 'normalGraph' ? graphs.normalGraph : graphs.devGraph;
            setCurrentGraph(selectedGraph);

            // Clear sidebar data and close the sidebar
            setChartSidebarData(null);
            setIsChartSidebarVisible(false);
        }
    };

    //TODO Insert actual logic for updating and reverting library upgrades
    const updateTreemap = (label: string) => {
        alert(`Button ${label} clicked`);
    };

    //TODO search muss gelöscht werden wenn filtersb geschlossen, filtersb schließen wenn chartsidebar offen
    return (
        <main style={BodyStyles.mainContainer}>
            <Box sx={{display: "flex", height: "100%"}}>
                {/* Filter Sidebar and Filter Button */}
                <Box>
                    <Box sx={filterContainerStyle(isFilterSidebarVisible)}>
                        <FilterButton text="" tooltip="Filter & Search" action={handleFilterButton}/>
                    </Box>
                    {!isChartSidebarVisible && isFileDropped && isFilterSidebarVisible && (
                        <FilterSidebar
                            isOpen={isFilterSidebarVisible}
                            onClose={handleCloseFilterSidebar}
                            onSearch={handleSearch}
                            searchResults={searchResults}
                            onResultClick={handleNodeClickInFilterSidebar}
                        />
                    )}
                </Box>

                {/* Main Content */}
                <Box sx={{
                    flexGrow: 1,
                    transition: "margin-left 0.3s ease",
                    marginLeft: isFilterSidebarVisible ? '-300px' : '0',
                }}>
                    {/* Graph Buttons */}
                    <ButtonGroup>
                        <NewFileButton text="New File" action={handleBackButton}/>
                    </ButtonGroup>
                    {isFileDropped && graphs && (
                        <ButtonGroup style={BodyStyles.chartButtonColumn}>
                            <NormDepButton
                                text="N"
                                tooltip="Normal Dependencies"
                                action={() => handleGraphSelection('normalGraph')}
                            />
                            <DevDepButton
                                text="D"
                                tooltip="Dev Dependencies"
                                action={() => handleGraphSelection('devGraph')}
                            />
                            <br/>
                            <UpdateButton
                                text=""
                                tooltip="Update Libraries"
                                action={() => updateTreemap("Update")}
                            />
                            <RevertButton
                                text=""
                                tooltip="Revert Updates"
                                action={() => updateTreemap("Revert")}
                            />
                        </ButtonGroup>
                    )}

                    {/* Graph */}
                    {isFileDropped && (
                        <Box style={BodyStyles.graphContainer}>
                            <div className={chartClassName} ref={chartRef} style={{width: '100%', height: '90%'}}/>
                        </Box>
                    )}

                    {/* Chart Sidebar */}
                    {isChartSidebarVisible && (
                        <ChartSidebar
                            fullName={chartSidebarData?.name ?? "N/A"}
                            versionNumber={chartSidebarData?.usedVersion ?? "N/A"}
                            releaseDate={chartSidebarData?.releaseDate ?? "N/A"}
                            ecosystem={
                                chartSidebarData?.name === currentGraph?.root.rootName
                                    ? chartSidebarData?.ecosystem
                                    : undefined
                            }
                            repoURL={
                                chartSidebarData?.name === currentGraph?.root.rootName
                                    ? chartSidebarData?.repoURL
                                    : undefined
                            }
                            revision={
                                chartSidebarData?.name === currentGraph?.root.rootName
                                    ? chartSidebarData?.revision
                                    : undefined
                            }
                            stats={chartSidebarData?.stats}
                            onClose={handleCloseChartSidebar}
                        />
                    )}
                </Box>
            </Box>
        </main>
    )
};

export default BaseChart;

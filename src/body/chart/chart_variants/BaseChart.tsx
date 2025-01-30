import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {Graph, Node} from "../../../file_handling/json_utils/JSONStructureInterfaces.tsx";
import NewFileButton from "../../buttons/NewFileButton.tsx";
import FilterCloseButton from "../../buttons/filter_sb_close_btn/FilterCloseButton.tsx";
import FilterSidebar from "../../sidebars/filter_sb/FilterSidebar.tsx";
import {ChartSidebarData, searchNodesByName, useChartSidebar} from "../../sidebars/sb_utils/ChartSidebarUtils.tsx";
import {useFilterSidebar} from "../../sidebars/sb_utils/FilterSidebarUtils.tsx";
import * as echarts from 'echarts';
import {useNavigate} from "react-router-dom";
import UpdateButton from "../../buttons/graph_buttons/UpdateButton.tsx";
import RevertButton from "../../buttons/graph_buttons/RevertButton.tsx";
import {BodyStyles} from "../../BodyStyles.ts";
import NormDepButton from "../../buttons/graph_buttons/NormDepButton.tsx";
import DevDepButton from "../../buttons/graph_buttons/DevDepButton.tsx";
import {Box, ButtonGroup} from "@mui/material";
import ChartSidebar from "../../sidebars/chart_sb/ChartSidebar.tsx";
import {filterContainerStyle} from "../../buttons/filter_sb_close_btn/FilterCloseButtonStyles.ts";
import {revertTreemap, useTreemapActions} from "../library_update_and_revert/TreemapActions.tsx";
import {UpdateWindow} from "../library_update_and_revert/UpdateWindow.tsx";
import {ChartCloseButtonStyles} from "../../buttons/chart_sb_close_btn/ChartCloseButtonStyles.ts";
import ChartCloseButton from "../../buttons/chart_sb_close_btn/ChartCloseButton.tsx";

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

    const {isUpdateWindowVisible, updateTreemap, handleCloseUpdateWindow} = useTreemapActions();

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
        handleChartButton,
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
        if (!currentGraph) return;

        const pathToNode = searchNodesByName(currentGraph, node.nodeName) ?? "Path not found";
        // Set data for ChartSidebar based on the node clicked
        setChartSidebarData({
            name: node.nodeName,
            usedVersion: node.usedVersion,
            releaseDate: node.releaseDate.toString(),
            stats: node.stats,
            pathToNode: pathToNode,
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

    return (
        <main style={BodyStyles.mainContainer}>
            <Box sx={{display: "flex", height: "100%"}}>
                {/* Filter Sidebar and Filter Button */}
                <Box>
                    {!isChartSidebarVisible && isFileDropped && (
                        <Box sx={filterContainerStyle(isFilterSidebarVisible)}>
                            <FilterCloseButton text="" tooltip="Filter & Search" action={handleFilterButton}/>
                        </Box>
                    )}
                    {isFileDropped && isFilterSidebarVisible && (
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
                                action={() => updateTreemap()}
                            />
                            <RevertButton
                                text=""
                                tooltip="Revert Updates"
                                action={() => revertTreemap("Revert")}
                            />
                        </ButtonGroup>
                    )}

                    {/* UpdateWindow */}
                    {isUpdateWindowVisible && <UpdateWindow onClose={handleCloseUpdateWindow}/>}

                    {/* Graph */}
                    {isFileDropped && (
                        <Box style={BodyStyles.graphContainer}>
                            <div className={chartClassName} ref={chartRef} style={{width: '100%', height: '90%'}}/>
                        </Box>
                    )}

                    {/* Chart Sidebar */}
                    <Box>
                        {isChartSidebarVisible && (
                            <Box sx={ChartCloseButtonStyles.chartContainerStyle}>
                                <ChartCloseButton text="" tooltip="Info" action={handleChartButton}/>
                            </Box>
                        )}
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
                                isOpen={isChartSidebarVisible}
                                //ToDO Make the Path work
                                pathToNode={chartSidebarData?.pathToNode}
                            />
                        )}
                    </Box>
                </Box>
            </Box>
        </main>
    )
};

export default BaseChart;

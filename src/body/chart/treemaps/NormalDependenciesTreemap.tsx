import * as echarts from 'echarts';
import {Graph} from "../../../jsonutils/JSONStructureInterfaces.tsx";
import * as React from "react";
import {ChartSidebarData} from "../../utils/sidebarutils/ChartSidebarUtils.tsx";
import type {TreemapSeriesOption} from 'echarts/charts';
import {transformJSONDataToTreemap, TreemapGenerator} from './TreemapGenerator';

export class NormalDependenciesTreemap implements TreemapGenerator {
    initChart(
        chartRef: HTMLDivElement,
        normalGraph: Graph,
        setChartSidebarData: React.Dispatch<React.SetStateAction<ChartSidebarData | null>>,
        setIsChartSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>
    ): echarts.ECharts | null {
        try {
            const chartInstance = echarts.init(chartRef);

            const rootNode = normalGraph.root;
            const rootName = rootNode.rootName || "Unknown Project";
            const rootVersion = rootNode.repositoryInfo.projectVersion || "N/A";

            const option = {
                title: {
                    text: "Normal Dependencies for: " + rootName,
                    subtext: 'Version: ' + rootVersion,
                    left: 'center',
                    top: 'top'
                },
                tooltip: {
                    formatter: function (info: any) {
                        const name = info.name;
                        const version = info.data.version || 'Unknown Version';

                        return [
                            '<div class="tooltip-title">' + echarts.format.encodeHTML(name) + '</div>',
                            'Version: ' + version
                        ].join('');
                    }
                },
                color: ['#62a995'],
                series: [{
                    name: 'dashboard',
                    type: 'treemap',
                    visibleMin: 100,
                    leafDepth: 1,
                    colorMappingBy: 'id',
                    levels: this.getLevelOption(),
                    data: transformJSONDataToTreemap(normalGraph).children
                }]
            };

            chartInstance.setOption(option);

            chartInstance.on('contextmenu', (params: any) => {
                if (params.componentType === 'series' && params.seriesType === 'treemap') {
                    params.event.event.preventDefault();
                    const nodeData = params.data;
                    setChartSidebarData(nodeData);
                    setIsChartSidebarVisible(true);
                }
            });

            return chartInstance;

        } catch (error) {
            console.error("Error initializing the dependencies chart:", error);
            return null;
        }
    }

    // Function to generate levels option for treemap
    getLevelOption(): TreemapSeriesOption['levels'] {
        return [
            {
                itemStyle: {
                    borderColor: '#555',
                    borderWidth: 4,
                    gapWidth: 4
                }
            },
            {
                colorSaturation: [0.3, 0.6],
                itemStyle: {
                    borderColorSaturation: 0.7,
                    gapWidth: 2,
                    borderWidth: 2
                }
            },
            {
                colorSaturation: [0.3, 0.5],
                itemStyle: {
                    borderColorSaturation: 0.6,
                    gapWidth: 1
                }
            },
            {
                colorSaturation: [0.3, 0.5]
            }
        ]
    }
}
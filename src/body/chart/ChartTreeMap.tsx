import * as echarts from 'echarts';
import {JSONData} from "../utils/Types.tsx";
import * as React from "react";
import { ChartSidebarData } from "./sidebars/ChartSidebarUtils.tsx";
import type { TreemapSeriesOption } from 'echarts/charts';

interface TreemapNode {
    name: string;
    value: number;
    version?: string;
    releaseDate?: string;
    ecosystem?: string;
    repoURL?: string;
    revision?: string;
    stats?: object;
    children?: TreemapNode[];
}

export const initChart = (
    chartRef: HTMLDivElement,
    jsonData: JSONData,
    setChartSidebarData: React.Dispatch<React.SetStateAction<ChartSidebarData  | null>>,
    setIsChartSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>
): echarts.ECharts | null => {
    try {
        const chartInstance = echarts.init(chartRef);

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
        console.error("Error initializing the chart:", error);
        return null;
    }
};

// Helper function to transform JSONData to ECharts treemap data format
const transformJSONDataToTreemap = (data: JSONData): TreemapNode  => {
    return {
        name: data.name,
        value: 1, // Placeholder value, adjust according to your data structure
        version: data.version,
        releaseDate: data.releaseDate,
        ecosystem: data.ecosystem,
        repoURL: data.repoURL,
        revision: data.revision,
        stats: data.stats,
        children: data.children?.map(child => transformJSONDataToTreemap(child)) // Recursively map children
    };
};

// Function to generate levels option for treemap
const getLevelOption = (): TreemapSeriesOption['levels'] => {
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

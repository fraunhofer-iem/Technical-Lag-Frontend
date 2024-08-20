import * as echarts from 'echarts';
import {JSONodeData} from "../../utils/Types.tsx";
import * as React from "react";
import {ChartSidebarData} from "../sidebars/ChartSidebarUtils.tsx";
import type {TreemapSeriesOption} from 'echarts/charts';
import {transformJSONDataToTreemap, TreemapGenerator} from './TreemapGenerator';

export class DevDependenciesTreemap implements TreemapGenerator {
    initChart(
        chartRef: HTMLDivElement,
        jsonData: JSONodeData,
        setChartSidebarData: React.Dispatch<React.SetStateAction<ChartSidebarData | null>>,
        setIsChartSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>
    ): echarts.ECharts | null {
        try {
            const chartInstance = echarts.init(chartRef);

            const option = {
                tooltip: {
                    formatter: function (info: any) {
                        const name = info.name;
                        const version = info.data.version;

                        return [
                            '<div class="tooltip-title">' + echarts.format.encodeHTML(name) + '</div>',
                            'Version: ' + version
                        ].join('');
                    }
                },
                color: ['#d35a62'],
                series: [{
                    type: 'treemap',
                    visibleMin: 300,
                    label: {
                        show: true,
                        formatter: '{b}',
                        color: '#000'
                    },
                    itemStyle: {
                        borderColor: '#e99695',
                        borderWidth: 2,
                        gapWidth: 2
                    },
                    colorMappingBy: 'id',
                    levels: this.getLevelOption(),
                    data: [transformJSONDataToTreemap(jsonData, 'devDependencies')]
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
            console.error("Error initializing the devDependencies chart:", error);
            return null;
        }
    }

// Function to generate levels option for treemap
    getLevelOption(): TreemapSeriesOption['levels'] {
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
}

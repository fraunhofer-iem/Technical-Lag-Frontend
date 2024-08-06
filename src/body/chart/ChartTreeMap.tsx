import * as echarts from 'echarts';
import {JSONData} from "../utils/Types.tsx";

export const initChart = (chartRef: HTMLDivElement, jsonData: JSONData, setChartSidebarData: any, setIsChartSidebarVisible: any) => {
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
};

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

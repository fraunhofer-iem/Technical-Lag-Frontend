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

            const transformedData = transformJSONDataToTreemap(normalGraph).children;

            this.applyDecalsAndColorsToChildren(transformedData);

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
                /*color: ['#62a995'],*/
                textColor: ['#000'],
                series: [{
                    darkMode: true,
                    name: rootName,
                    type: 'treemap',
                    visibleMin: 100,
                    leafDepth: 1,
                    colorMappingBy: 'id',
                    levels: this.getLevelOption(),
                    data: transformedData
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

    applyDecalsAndColorsToChildren(children: any[]) {
        //TODO
        const colorPalette = [
            '#008B45', // Dark Green
            '#006B3F', // Dark Sea Green
            '#007B7F', // Dark Cyan
            '#005F5F', // Dark Teal
            '#004B54', // Deep Teal
            '#007A8D', // Deep Turquoise
            '#004F4F', // Dark Slate Gray
            '#003D47', // Dark Blue Green
            '#003B2F', // Dark Forest Green
            '#003F3F', // Dark Slate Blue
            '#005F69', // Deep Aqua
            '#007B5C', // Dark Medium Sea Green
            '#004B3D', // Deep Green
            '#003D3D', // Dark Midnight Green
            '#00354D', // Dark Blue
            '#00274D'  // Dark Royal Blue
        ];
        const decals = [
            {color: 'rgba(0, 0, 0, 0.1)', symbol: 'circle', dashArrayX: [2, 0], dashArrayY: [4, 10]},
            {color: 'rgba(0, 0, 0, 0.15)', symbol: 'rect', dashArrayX: [4, 10], dashArrayY: [8, 2]},
            {color: 'rgba(0, 0, 0, 0.2)', symbol: 'triangle', dashArrayX: [6, 3], dashArrayY: [2, 6]},
            {color: 'rgba(0, 0, 0, 0.25)', symbol: 'diamond', dashArrayX: [10, 2], dashArrayY: [6, 4]}
        ];

        children.forEach((child, index) => {
            const color = colorPalette[index % colorPalette.length];
            const decal = decals[index % decals.length];

            // Initialize itemStyle if not present
            if (!child.itemStyle) {
                child.itemStyle = {};
            }

            // Assign color and decal to the direct dependency (child of the root)
            child.itemStyle.color = color;
            child.itemStyle.decal = decal;

            // Check if the color is correctly assigned
            if (!child.itemStyle.color) {
                console.warn("Child does not have a valid color assigned:", child);
                child.itemStyle.color = '#000000'; // Fallback to black if undefined
            }

            // Get the text color based on background color
            child.itemStyle.textColor = this.getTextColor(child.itemStyle.color); // Set text color based on background color
        });

        // Recursively apply the same decal to all descendants of each child
        children.forEach(child => this.applyDecalToDescendants(child, child.itemStyle.decal));
/*        console.log("children:", children);*/
    }

// Function to calculate text color based on background color
    getTextColor(bgColor: string): string {
        // Check if the input color is a valid hex string
        if (!bgColor || !/^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(bgColor)) {
            console.warn("Invalid background color:", bgColor);
            return '#000000'; // Default to black if invalid
        }

        const rgb = this.hexToRgb(bgColor);
        const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b);
/*        console.log(luminance);
        console.log(luminance > 60  ? '#000000' : '#FFFFFF');*/
        return luminance > 60  ? '#000000' : '#FFFFFF'; // Use black for bright backgrounds, white for dark
    }

// Function to convert hex color to RGB
    hexToRgb(hex: string) {
        const bigint = parseInt(hex.replace('#', ''), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return {r, g, b};
    }

// Recursively apply the decal to all descendants of a node
    applyDecalToDescendants(node: any, decal: any) {
        if (node.children?.length) {
            node.children.forEach((child: any) => {
                if (!child.itemStyle) {
                    child.itemStyle = {};
                }
                child.itemStyle.decal = decal;

                // Check if child has a color before getting the text color
                if (child.itemStyle.color) {
                    child.itemStyle.textColor = this.getTextColor(child.itemStyle.color); // Set text color based on background color
                    console.log(child.itemStyle.textColor);
                } else {
                    child.itemStyle.textColor = '#000000'; // Fallback for undefined color
                }

                this.applyDecalToDescendants(child, decal);
            });
        } else
            console.warn("No children found");
    }
}

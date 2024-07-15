import * as React from "react";
import {useEffect, useRef} from "react";
import "../../buttons/button.css";
import "./body.css";
import "../filehandling/dragndrop.css";
import * as echarts from 'echarts';

// Function to generate random color
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// Function to generate a set of colors for a group
const generateGroupColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        colors.push(getRandomColor());
    }
    return colors;
};

// Function to generate random name
const getRandomName = () => {
    const syllables = ["ba", "be", "bi", "bo", "bu", "da", "de", "di", "do", "du", "fa", "fe", "fi", "fo", "fu"];
    const nameLength = Math.floor(Math.random() * 3) + 2;
    let name = "";
    for (let i = 0; i < nameLength; i++) {
        name += syllables[Math.floor(Math.random() * syllables.length)];
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
};

// Recursive function to create nodes with consistent colors
const createRandomNodes = (depth, maxDepth, groupColors) => {
    if (depth > maxDepth) {
        return [];
    }

    const numChildren = Math.floor(Math.random() * 4) + 1;
    const nodes = [];

    for (let i = 0; i < numChildren; i++) {
        const node = {
            name: getRandomName(),
            itemStyle: { color: groupColors[depth] || getRandomColor() } // Use consistent colors for each level
        };

        if (Math.random() > 0.3 && depth < maxDepth) {
            node.children = createRandomNodes(depth + 1, maxDepth, groupColors);
        } else {
            node.value = 1;
        }

        nodes.push(node);
    }

    return nodes;
};

// Generate the root data with consistent group colors
const generateRandomData = () => {
    const groupColors = generateGroupColors(4); // Adjust the number of groups as needed
    return createRandomNodes(0, 8, groupColors); // Adjust the second parameter to change the depth
};

const TestChart: React.FC = () => {

    React.useEffect(() => {
        const storedJsonData = sessionStorage.getItem("jsonData");
        const storedIsFileDropped = sessionStorage.getItem("isFileDropped");

        if (storedJsonData && storedIsFileDropped === "true") {
            setJsonData(JSON.parse(storedJsonData));
            setIsFileDropped(true);
        }
    }, []);

    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            // Render a minimal example to confirm ECharts is working correctly
            try {
                const chartInstance = echarts.init(chartRef.current);

                const minimalOption = {
                    title: {
                        text: 'WORLD COFFEE RESEARCH SENSORY LEXICON',
                        subtext: 'Source: https://worldcoffeeresearch.org/work/sensory-lexicon/',
                        textStyle: {
                            fontSize: 14,
                            align: 'center'
                        },
                        subtextStyle: {
                            align: 'center'
                        },
                        sublink: 'https://worldcoffeeresearch.org/work/sensory-lexicon/'
                    },
                    series: {
                        type: 'sunburst',

                        data: generateRandomData(),
                        radius: [0, '95%'],
                        sort: undefined,

                        emphasis: {
                            focus: 'ancestor'
                        },

                        levels: [
                            {},
                            {
                                r0: '15%',
                                r: '35%',
                                itemStyle: {
                                    borderWidth: 2
                                },
                                label: {
                                    rotate: 'tangential'
                                }
                            },
                            {
                                r0: '35%',
                                r: '70%',
                                label: {
                                    align: 'right'
                                }
                            },
                            {
                                r0: '70%',
                                r: '72%',
                                label: {
                                    position: 'outside',
                                    padding: 3,
                                    silent: false
                                },
                                itemStyle: {
                                    borderWidth: 3
                                }
                            }
                        ]
                    }
                };
                chartInstance.setOption(minimalOption);
                console.log("Rendered minimal example");
            } catch (error) {
                console.error("Error rendering minimal example:", error);
            }
        }
    }, );

    return (
        <main className="main-container">
            <div className="chart" ref={chartRef}
                 style={{width: '90vw', height: '90vh', border: '1px solid red'}}/>
        </main>
    );
};

export default TestChart;
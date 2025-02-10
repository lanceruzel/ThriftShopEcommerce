'use client'

import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";

const LineChart = () => {
    const [chartWidth, setChartWidth] = useState(500);

    useEffect(() => {
        const handleResize = () => {
            const containerWidth = document.getElementById('chart-container')?.clientWidth || 500;
            setChartWidth(containerWidth);
        };

        // Set initial width
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const series = [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }];

    const options = {
        chart: {
            type: 'line',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Product Trends by Month',
            align: 'left',
            style: {
                fontSize: '14px'
            }
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
        },
        legend: {
            fontSize: '12px'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: '100%'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    return (
        <div id="chart-container" className="p-3 border rounded shadow-sm d-flex align-items-center justify-content-center">
            <Chart
                options={options}
                series={series}
                type="line"
                width={chartWidth}
                height={350}
            />
        </div>
    );
};

export default LineChart;

import { Component } from 'react'
import Chart from "react-apexcharts";

class PieChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [44, 55, 13, 43, 22],
            options: {
                chart: {
                    width: 300,
                    type: 'pie',
                },
                labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
                title: {
                    text: 'Product Trends by Month',
                    align: 'center'
                },
                legend: {
                    position: 'bottom'
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                    }
                }]
            },
        };
    }

    render() {
        return (
            <div className='p-3 border rounded shadow-sm d-flex align-items-center justify-content-center'>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="pie"
                    width="435"
                />
            </div>
        )
    }
}
export default PieChart
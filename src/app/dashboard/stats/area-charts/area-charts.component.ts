import {Component, OnInit, ViewChild} from '@angular/core';
import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexStroke,
    ApexYAxis,
    ApexTitleSubtitle,
    ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    labels: string[];
    legend: ApexLegend;
    subtitle: ApexTitleSubtitle;
};

@Component({
    selector: 'app-area-charts',
    templateUrl: './area-charts.component.html',
    styleUrls: ['./area-charts.component.css']
})
export class AreaChartsComponent implements OnInit {

    @ViewChild("chart") chart: ChartComponent | any;
    public chartOptions: Partial<ChartOptions> | any;

    constructor() {

        this.chartOptions = {
            series: [
                {
                    name: "STOCK ABC",
                    data: [
                        8107.85,
                        8128.0,
                        8122.9,
                        8165.5,
                        8340.7,
                        8423.7,
                        8423.5,
                        8514.3,
                        8481.85,
                        8487.7,
                        8506.9,
                        8626.2
                    ]
                }
            ],
            chart: {
                type: "area",
                height: 350,
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight"
            },
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            xaxis: {
                type: "string"
            },
            yaxis: {
                opposite: false
            },
            legend: {
                horizontalAlign: "left"
            }
        };
    }

    ngOnInit(): void {
    }

}

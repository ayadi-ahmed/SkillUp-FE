import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartComponent} from "ng-apexcharts";

import {
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
};

@Component({
    selector: 'app-pie-charts',
    templateUrl: './pie-charts.component.html',
    styleUrls: ['./pie-charts.component.css']
})
export class PieChartsComponent implements OnInit {
    @ViewChild("chart") chart: ChartComponent | any;
    public chartOptions: Partial<ChartOptions> | any;

    constructor() {
        this.chartOptions = {
            series: [44, 55, 13, 43, 22],
            chart: {
                width: 380,
                type: "pie"
            },
            labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ]
        }
    }

    ngOnInit(): void {
    }

}

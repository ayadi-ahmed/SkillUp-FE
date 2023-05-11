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
import {AbonnementService} from "../../../Services/abonnement.service";
import {HttpErrorResponse} from "@angular/common/http";

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

    nbAbonnements: number[] = [0,0,0,0,0,0,0,0,0,0,0,0]
    @ViewChild("chart") chart: ChartComponent | any;
    public chartOptions: Partial<ChartOptions> | any;

    constructor(private abonnementService: AbonnementService) {
    }

    ngOnInit(): void {
        this.findSubscriptionsByMonthForCurrentYear();
    }

    findSubscriptionsByMonthForCurrentYear(){
        this.abonnementService.findSubscriptionsByMonthForCurrentYear().subscribe(
            (response: any) => {
                for (let i of response){
                    this.nbAbonnements[i.month - 1] = i.count;
                }

                this.chartOptions = {
                    series: [
                        {
                            name: "Subscriptions",
                            data: this.nbAbonnements
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

            },
            (error:HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }
}

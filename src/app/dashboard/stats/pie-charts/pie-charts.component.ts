import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartComponent} from "ng-apexcharts";

import {
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart
} from "ng-apexcharts";
import {CategorieService} from "../../../Services/categorie.service";
import {TransactionCandidatService} from "../../../Services/transaction-candidat.service";

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
    private categories: any[] = [];
    private percentages: any[] = [];

    constructor(private catagoryService: CategorieService,
                private transactionClientService: TransactionCandidatService) {
        this.chartOptions = {
            series: this.percentages,
            chart: {
                width: 500,
                type: "pie"
            },
            labels: this.categories,

            responsive: [
                {
                    breakpoint: 500,
                    options: {
                        chart: {
                            width: 500
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
        this.sumTransactionsClientPerCategory();
    }

    sumTransactionsClientPerCategory() {
        return this.transactionClientService.getSumTransactionsClientPerCategory().subscribe(
            (response: any[]) => {
                for (let l of response) {
                    this.categories.push(l[0]);
                    this.percentages.push(l[1]);
                }
            }
        )
    }

}

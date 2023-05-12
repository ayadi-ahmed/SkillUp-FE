import {Component, OnInit} from '@angular/core';
import {ManagerService} from "../../Services/manager.service";
import {Manager} from "../../Entities/manager";
import {FormationService} from "../../Services/formation.service";
import {course} from "../../Entities/courses";
import {CategorieService} from "../../Services/categorie.service";
import {TransactionCentreService} from "../../Services/transaction-centre.service";
import {CandidatService} from "../../Services/candidat.service";

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css'],

})
export class StatsComponent implements OnInit {

    managers: Manager[] = [];
    courses: course[] = [];
    categoriesPercentage: any[] = [];
    daySales = 0;
    weekSales = 0;
    monthSales = 0;
    coursesCount: number = 0;
    managersCount: number = 0;
    sumTransactionsCentres: number = 0;
    clientsCount: number = 0;

    constructor(private managerService: ManagerService,
                private formationService: FormationService,
                private categorieService: CategorieService,
                private transactionCentreService: TransactionCentreService,
                private candidatService: CandidatService) {

    }

    ngOnInit(): void {
        this.findFirst10OrderByIdDesc();
        this.getLastCourses();
        this.getPercentageOfCoursesInEachCategory();
        this.getTotalForDay();
        this.getTotalForWeek();
        this.getTotalForMonth();
        this.getCoursesCount();
        this.getManagersCount();
        this.getTransactionsCentresSum();
        this.getClientsCount();
    }

    findFirst10OrderByIdDesc() {
        this.managerService.findFirst10OrderByIdDesc().subscribe(
            value => this.managers = value
        )
    }


    getLastCourses() {
        this.formationService.findFirst10ByOrderByIdDesc().subscribe(
            value => this.courses = value
        )
    }

    getPercentageOfCoursesInEachCategory() {
        this.categorieService.getPercentageOfCoursesInEachCategory().subscribe(
            value => this.categoriesPercentage = value
        )
    }

    getTotalForDay() {
        this.transactionCentreService.getTotalForDay().subscribe(
            value => this.daySales = value
        )
    }

    getTotalForWeek() {
        this.transactionCentreService.getTotalForWeek().subscribe(
            value => this.weekSales = value
        )
    }

    getTotalForMonth() {
        this.transactionCentreService.getTotalForMonth().subscribe(
            value => this.monthSales = value
        )
    }


    getCoursesCount() {
        return this.formationService.getCoursesCount().subscribe((res => {
            this.coursesCount = res;
        }))
    }

    getManagersCount() {
        return this.managerService.getManagersCount().subscribe((res1 => {
            this.managersCount = res1;
            console.log(res1)
        }))
    }

    getTransactionsCentresSum() {
        return this.transactionCentreService.getSumTransactionsCentres().subscribe((res2 => {
            this.sumTransactionsCentres = res2;
        }))
    }

    getClientsCount() {
        return this.candidatService.getClientsCount().subscribe((res3 => {
            this.clientsCount = res3;
        }))
    }
}

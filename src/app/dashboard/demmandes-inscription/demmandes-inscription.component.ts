import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {HttpErrorResponse} from "@angular/common/http";
import {TrainingCenterService} from "../../Services/training-center.service";

@Component({
    selector: 'app-demmandes-inscription',
    templateUrl: './demmandes-inscription.component.html',
    styleUrls: ['./demmandes-inscription.component.css']
})
export class DemmandesInscriptionComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['berth date', 'matriculeFiscal', 'name', 'email', 'tel', 'action'];
    dataSource = new MatTableDataSource<any>([]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    public etatDemande: any = "";

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor(private trainingCenterService: TrainingCenterService) {
    }

    ngOnInit(): void {
        this.getAllCenters();
    }

    getAllCenters() {
        this.trainingCenterService.getAllTrainingCenters().subscribe(
            (response: any) => {
                this.dataSource.data = response;
            }
        )
    }

    getCentreFormationsByEtatDemandeInscription(etat: string) {
        this.trainingCenterService.getCentreFormationsByEtatDemandeInscription(etat).subscribe(
            (response: any) => {
                this.dataSource.data = response;
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    changeEtat(id: number, etat: string) {
        this.trainingCenterService.changeEtatDemandeIscription(id, etat).subscribe(
            (response: any) => {
                this.filter();
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    filter() {
        if (this.etatDemande == ''){
            this.getAllCenters();
        }else {
            this.getCentreFormationsByEtatDemandeInscription(this.etatDemande);
        }
    }
}

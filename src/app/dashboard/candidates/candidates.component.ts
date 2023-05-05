import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AuthentificationService} from "../../Services/authentification.service";
import {HttpErrorResponse} from "@angular/common/http";
import {CandidatService} from "../../Services/candidat.service";

@Component({
    selector: 'app-candidates',
    templateUrl: './candidates.component.html',
    styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['name', 'last name', 'email', 'tel', 'berth date', 'action'];
    dataSource = new MatTableDataSource<any>([]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    public accountNonLocked: any = "";
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor(private candidatService: CandidatService,
                private authentificationService: AuthentificationService) {
    }

    ngOnInit(): void {
        this.getAllCandidats();
    }

    getAllCandidats() {
        this.candidatService.getAllCandidats().subscribe(
            (response: any) => {
                this.dataSource.data = response;
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    lockAccount(id: number) {
        this.authentificationService.lockAccount(id).subscribe(
            (response: any) => {
                this.filter();
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    getAllByAccountNonLocked(){
        this.candidatService.getClientsByAccountNonLocked(this.accountNonLocked)
            .subscribe(
                (response: any) => {
                    this.dataSource.data = response;
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    filter(){
        if (this.accountNonLocked == ""){
            this.getAllCandidats();
        }else {
            this.getAllByAccountNonLocked();
        }
    }

}

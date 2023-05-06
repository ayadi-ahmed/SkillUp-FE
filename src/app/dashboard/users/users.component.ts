import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ManagerService} from "../../Services/manager.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthentificationService} from "../../Services/authentification.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})


export class UsersComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['name', 'last name', 'email', 'tel', 'berth date', 'action'];
    dataSource = new MatTableDataSource<any>([]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    public accountNonLocked: any ="";
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor(private managerService: ManagerService,
                private authentificationService: AuthentificationService) {
    }

    ngOnInit(): void {
        this.getAllManagers();
    }

    getAllManagers(){
        this.managerService.getAllManagers().subscribe(
            (response: any) => {
                this.dataSource.data = response;
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    lockAccount(id: number){
        this.authentificationService.lockAccount(id).subscribe(
            (response: any) => {
                this.filter();
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    getManagersByAccountNonLocked(){
        this.managerService.getManagersByAccountNonLocked(this.accountNonLocked)
            .subscribe(
                (response: any) => {
                    this.dataSource.data = response;
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    filter() {
        if (this.accountNonLocked == ''){
            this.getAllManagers();
        }else {
            this.getManagersByAccountNonLocked();
        }
    }
}

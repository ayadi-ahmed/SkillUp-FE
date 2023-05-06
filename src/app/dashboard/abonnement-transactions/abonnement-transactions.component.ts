import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {TransactionCentreService} from "../../Services/transaction-centre.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-abonnement-transactions',
    templateUrl: './abonnement-transactions.component.html',
    styleUrls: ['./abonnement-transactions.component.css']
})
export class AbonnementTransactionsComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['dateTransaction', 'valeur','manager', 'emailManager', 'managerTel', 'center', 'emailCenter', 'centerTel', 'abonnement', 'dateDebut', 'dateFin'];
    dataSource = new MatTableDataSource<any>([]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    constructor(private transactionCentreService: TransactionCentreService) {
    }

    ngOnInit(): void {
        this.getAllTransactions();
    }


    getAllTransactions() {
        this.transactionCentreService.getAllTransactions()
            .subscribe(
                (response: any) => {
                    this.dataSource.data = response;
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }
}

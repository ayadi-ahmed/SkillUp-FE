import { Component, OnInit } from '@angular/core';
import {TransactionCentreService} from "../../Services/transaction-centre.service";
import {AuthentificationService} from "../../Services/authentification.service";
import {HttpErrorResponse} from "@angular/common/http";
import {TransactionCenter} from "../../Entities/transaction-center";

@Component({
  selector: 'app-transaction-center',
  templateUrl: './transaction-center.component.html',
  styleUrls: ['./transaction-center.component.css']
})
export class TransactionCenterComponent implements OnInit {

  public transactions: TransactionCenter[] = [];
  constructor(private transactionCentreService: TransactionCentreService,
              private authentificationService: AuthentificationService) { }

  ngOnInit(): void {
    this.getTransactionCentresByCentreFormation_Manager_Id();
  }


  getTransactionCentresByCentreFormation_Manager_Id(){
    this.transactionCentreService.getTransactionCentresByCentreFormation_Manager_Id(
        this.authentificationService.getUserId()
    ).subscribe(
        (response: TransactionCenter[]) => {
          this.transactions = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }

    )
  }
}

import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../Services/authentification.service";
import {TransactionCandidatService} from "../../Services/transaction-candidat.service";
import {TransactionClient} from "../../Entities/transaction-client";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-transactions-client',
  templateUrl: './transactions-client.component.html',
  styleUrls: ['./transactions-client.component.css']
})
export class TransactionsClientComponent implements OnInit {

  transactions: TransactionClient[] = [];

  constructor(private transactionService: TransactionCandidatService,
              private authService:AuthentificationService) { }

  ngOnInit(): void {
    this.transactionService.getTransactionsByClientId(this.authService.getUserId()).subscribe((res:TransactionClient[])=>{
      this.transactions=res;
        console.log(res);
    },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });

  }



}

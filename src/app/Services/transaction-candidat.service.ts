import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TransactionClient} from "../Entities/transaction-client";
import {AuthentificationService} from "./authentification.service";

@Injectable({
  providedIn: 'root'
})
export class TransactionCandidatService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,
              private authentificationService:AuthentificationService) {
  }

  public getTransactionsByClientId(candidatId :number):Observable<any>{
    return this.http.get<any>(this.apiServerUrl +`/api/transaction/client/transactions/${candidatId}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }

  public addTransaction(transactionClient: TransactionClient ):Observable<any>{
    return this.http.post<any>(this.apiServerUrl + '/api/transaction/client/add',transactionClient,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
}

  public affectTransacationToClient(clientId: number,transactionId : number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/transaction/client/${clientId}/transaction/${transactionId}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }

  public affectFormationToTransaction(fid: number,tid : number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/transaction/client/formation/${fid}/transaction/${tid}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }


  public getSumTransactionsClientPerCategory(): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/transaction/client/stats/sumTransactionsClientPerCategory`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });

  public getTransactionClientsByFormation_Id(cid: number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/transaction/client/course/${cid}`);

  }

}

import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthentificationService} from "./authentification.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionCentreService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,
              private authentificationService: AuthentificationService) {
  }

  public getAllTransactions(): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/transaction/centre`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }
  public addTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(this.apiServerUrl + `/api/transaction/centre/add`,transaction,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }

  public addTransactionToCentre(centreId: number, transactionId: number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/transaction/centre/${centreId}/transaction/${transactionId}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }

  public addTransactionToAbonnement(abonnementId: number, transactionId: number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/transaction/centre/abonnement/${abonnementId}/transaction/${transactionId}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }

  public getTransactionCentresByCentreFormation_Manager_Id(managerId: number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/transaction/centre/manager/${managerId}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }

}

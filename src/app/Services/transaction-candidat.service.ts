import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TransactionClient} from "../Entities/transaction-client";
import {Candidat} from "../Entities/candidat";

@Injectable({
  providedIn: 'root'
})
export class TransactionCandidatService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getTransactionsByClientId(candidatId :number):Observable<any>{
    return this.http.get<any>(`/api/client/${candidatId}`);
  }

  public addTransaction(transactionClient: TransactionClient ):Observable<any>{
    return this.http.post<any>(this.apiServerUrl + `/api/transaction/client/add`,transactionClient)
}

  public affectTransacationToClient(clientId: number,transactionId : number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/transaction/client/${clientId}/transaction/${transactionId}`);
  }

}

import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Seance} from "../Entities/Seance";
import {AuthentificationService} from "./authentification.service";

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,
              private authentificationService: AuthentificationService) {
  }

  public getAllSeances(): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/seance`);
  }
  public getSeanceById(id: number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/seance/${id}`);
  }
  public addSeance(seance: any): Observable<any> {
    return this.http.post<any>(this.apiServerUrl + `/api/seance/add`,seance,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }
  public updateSeance(seance: Seance): Observable<any> {
    return this.http.put<any>(this.apiServerUrl + `/api/seance/update`,seance,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }
  public deleteSeance(id: number): Observable<any> {
    return this.http.delete<any>(this.apiServerUrl + `/api/seance/delete/${id}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }
}

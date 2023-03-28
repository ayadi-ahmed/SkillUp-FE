import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Seance} from "../Entities/Seance";

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllSeances(): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/seance`);
  }
  public getSeanceById(id: number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/seance/${id}`);
  }
  public addSeance(seance: any): Observable<any> {
    return this.http.post<any>(this.apiServerUrl + `/api/seance/add`,seance);
  }
  public updateSeance(seance: Seance): Observable<any> {
    return this.http.put<any>(this.apiServerUrl + `/api/seance/update`,seance);
  }
  public deleteSeance(id: number): Observable<any> {
    return this.http.delete<any>(this.apiServerUrl + `/api/seance/delete/${id}`);
  }
}

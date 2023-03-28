import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private formationUrl= environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  public getAllFormations():Observable<any> {
    return this.http.get<any>(this.formationUrl+`/api/formation`);
  }
  public addFormation(formation:any):Observable<any> {
    return this.http.post(this.formationUrl+`/api/formation/add`,formation)
  }
  public getFormationById(id: number): Observable<any> {
    return this.http.get<any>(this.formationUrl + `/api/formation/${id}`);
  }
}

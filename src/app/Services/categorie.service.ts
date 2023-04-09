import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public addCategory(categorie: any): Observable<any>{
    return this.http.post(this.apiServerUrl + `/api/categorie/add`, categorie);
  }
  public getAllCategories(): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/categorie`);
  }
  public affectFormationToCategory(formationId: number, categorieId: number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/categorie/formation/${formationId}/categorie/${categorieId}`);
  }
}

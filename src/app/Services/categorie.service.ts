import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthentificationService} from "./authentification.service";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,
              private authentificationService: AuthentificationService) {
  }

  public addCategory(categorie: any): Observable<any>{
    return this.http.post(this.apiServerUrl + `/api/categorie/add`, categorie,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }
  public getAllCategories(): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/categorie`);
  }
  public affectFormationToCategory(formationId: number, categorieId: number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/categorie/formation/${formationId}/categorie/${categorieId}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }

  public getCategoryByName(name: string): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/categorie/nom/${name}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }

  public getCategorieByFormations_Id(id: number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/categorie/formation/${id}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }
}

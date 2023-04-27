import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {AuthentificationService} from "./authentification.service";

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private formationUrl= environment.apiBaseUrl;
  constructor(private http:HttpClient,
              private authentificationService: AuthentificationService) { }
  public getAllFormations():Observable<any> {
    return this.http.get<any>(this.formationUrl+`/api/formation`);
  }
  public addFormation(formation: FormData):Observable<any> {
    return this.http.post(this.formationUrl+`/api/formation/add`,formation,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    })
  }
  public removeTagFromFormation(idf: number, idt: number): Observable<any> {
    return this.http.get<any>(this.formationUrl + `/api/formation/${idf}/tag/${idt}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }
  public deleteFormation(id: number): Observable<any> {
    return this.http.delete<any>(this.formationUrl + `/api/formation/delete/${id}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }
  public getFormationById(id: number): Observable<any> {
    return this.http.get<any>(this.formationUrl + `/api/formation/${id}`);
  }
  public getFormationByIdCentre(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.formationUrl + `/api/formation/center/${id}`);
  }
  public affectSeanceToFormation(seanceId: number, formationId: number) {
    return this.http.get(this.formationUrl + `/api/formation/seance/${seanceId}/formation/${formationId}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }
  public getFormationByTitle(title: string): Observable<any> {
    return this.http.get<any>(this.formationUrl + `/api/formation/titre/${title}`);
  }
  public getFormationByPrixBetween(prix1: number, prix2: number): Observable<any> {
    return this.http.get<any>(this.formationUrl + `/api/formation/prix/${prix1}/${prix2}`);
  }
  public getFormationByTag(tag: string): Observable<any> {
    return this.http.get<any>(this.formationUrl + `/api/formation/tag/${tag}`);
  }
  public getFormationByTagOrTitle(param: string): Observable<any> {
    return this.http.get<any>(this.formationUrl + `/api/formation/find/${param}`);
  }
  public getFormationsByPrixBetweenAndCategorie_Id(prix1: number, prix2: number, categoryId: number): Observable<any> {
    return this.http.get<any>(this.formationUrl + `/api/formation/prix/${prix1}/${prix2}/categorie/${categoryId}`);
  }
  public getFormationByCategoryId(id: number): Observable<any> {
    return this.http.get<any>(this.formationUrl + `/api/formation/categorie/${id}`);
  }
  public updateFormation(formation: any): Observable<any> {
    return this.http.put<any>(this.formationUrl + `/api/formation/update`,formation,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }
}

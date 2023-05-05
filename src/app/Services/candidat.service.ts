import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Candidat} from "../Entities/candidat";
import {AuthentificationService} from "./authentification.service";

@Injectable({
    providedIn: 'root'
})
export class CandidatService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient,
                private authentificationService:AuthentificationService) {
    }

    public getAllCandidats(): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/client`,{
            headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
        });
    }
    public getCandidatById(id: number): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/client/${id}`,{
            headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
        });
    }
    public addCandidat(candidat: any): Observable<any> {
        return this.http.post<any>(this.apiServerUrl + `/api/client/add`,candidat);
    }
    public updateCandidat(candidat: Candidat): Observable<any> {
        return this.http.put<any>(this.apiServerUrl + `/api/client/update`,candidat,{
            headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
        });
    }
    public deleteCandidat(id: number): Observable<any> {
        return this.http.delete<any>(this.apiServerUrl + `/api/client/delete/${id}`,{
            headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
        });
    }

    public getClientsByAccountNonLocked(value: boolean): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/client/etat/${value}`,{
            headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
        });
    }
}

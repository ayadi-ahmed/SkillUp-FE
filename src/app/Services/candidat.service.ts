import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Candidat} from "../Entities/candidat";

@Injectable({
    providedIn: 'root'
})
export class CandidatService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public getAllCandidats(): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/client`);
    }
    public getCandidatById(id: number): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/client/${id}`);
    }
    public addCandidat(candidat: any): Observable<any> {
        return this.http.post<any>(this.apiServerUrl + `/api/client/add`,candidat);
    }
    public updateCandidat(candidat: Candidat): Observable<any> {
        return this.http.put<any>(this.apiServerUrl + `/api/client/update`,candidat);
    }
    public deleteCandidat(id: number): Observable<any> {
        return this.http.delete<any>(this.apiServerUrl + `/api/client/delete/${id}`);
    }
}

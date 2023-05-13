import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthentificationService} from "./authentification.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RatingService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient,
                private authentificationService: AuthentificationService) {
    }

    public getAllAvis(): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/avis`, {
            headers: new HttpHeaders({authorization: 'Bearer ' + this.authentificationService.getToken()})
        });
    }

    public addAvis(avis: any): Observable<any> {
        return this.http.post<any>(this.apiServerUrl + `/api/avis/add`, avis, {
            headers: new HttpHeaders({authorization: 'Bearer ' + this.authentificationService.getToken()})
        });
    }

    public affectAvisToCandidat(cid: number, aid: number): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/avis/client/${cid}/avis/${aid}`, {
            headers: new HttpHeaders({authorization: 'Bearer ' + this.authentificationService.getToken()})
        });
    }

    public affectAvisToCourse(fid: number, aid: number): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/avis/formation/${fid}/avis/${aid}`, {
            headers: new HttpHeaders({authorization: 'Bearer ' + this.authentificationService.getToken()})
        });
    }

}

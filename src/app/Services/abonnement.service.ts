import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthentificationService} from "./authentification.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AbonnementService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient,
                private authentificationService: AuthentificationService) {
    }

    public getAllAbonnements(): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/abonnement`, {
            headers: new HttpHeaders({authorization: 'Bearer ' + this.authentificationService.getToken()})
        });
    }

    public addAbonnement(abonnement: any): Observable<any> {
        return this.http.post<any>(this.apiServerUrl + `/api/abonnement/add`, abonnement, {
            headers: new HttpHeaders({authorization: 'Bearer ' + this.authentificationService.getToken()})
        });
    }

    public findFirstByCentreFormation_IdOrderByIdDesc(id: number): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/abonnement/center/${id}`,{
            headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
        });
    }
}

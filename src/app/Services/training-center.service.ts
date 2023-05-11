import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TrainingCenter} from "../Entities/training-center";
import {AuthentificationService} from "./authentification.service";

@Injectable({
    providedIn: 'root'
})
export class TrainingCenterService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient,
                private authentificationService: AuthentificationService) {
    }

    public getAllTrainingCenters(): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/CentreFormation`);
    }

    public getTrainingCenterById(id: number): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/CentreFormation/${id}`);
    }

    public addTrainingCenter(trainingCenter: any): Observable<any> {
        return this.http.post<any>(this.apiServerUrl + `/api/CentreFormation/add`, trainingCenter);
    }

    public updateTrainingCenter(trainingCenter: TrainingCenter): Observable<any> {
        return this.http.put<any>(this.apiServerUrl + `/api/CentreFormation/update`, trainingCenter, {
            headers: new HttpHeaders({authorization: 'Bearer ' + this.authentificationService.getToken()})
        });
    }

    public deleteTrainingCenter(id: number): Observable<any> {
        return this.http.delete<any>(this.apiServerUrl + `/api/CentreFormation/delete/${id}`, {
            headers: new HttpHeaders({authorization: 'Bearer ' + this.authentificationService.getToken()})
        });
    }

    public getAllByManagerId(managerId: number): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/CentreFormation/manager/${managerId}`, {
            headers: new HttpHeaders({authorization: 'Bearer ' + this.authentificationService.getToken()})
        });
    }

    public affectFormationToCenter(formationId: number, centreId: number): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/CentreFormation/${centreId}/formation/${formationId}`, {
            headers: new HttpHeaders({authorization: 'Bearer ' + this.authentificationService.getToken()})
        });
    }

    public affectCenterToCategory(categoryId: number, centreId: number): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/CentreFormation/${centreId}/categorie/${categoryId}`);
    }

    public getCentreFormationsByEtatDemandeInscription(etat: string): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/CentreFormation/etat/${etat}`, {
            headers: new HttpHeaders({authorization: 'Bearer ' + this.authentificationService.getToken()})
        });
    }

    public changeEtatDemandeIscription(id: number, etat: string): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/CentreFormation/${id}/etat/${etat}`, {
            headers: new HttpHeaders({authorization: 'Bearer ' + this.authentificationService.getToken()})
        });
    }

    public addAbonnementToCentreFormation(idCenter: number, idAbonnement: number): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/CentreFormation/${idCenter}/abonnement/${idAbonnement}`, {
            headers: new HttpHeaders({authorization: 'Bearer ' + this.authentificationService.getToken()})
        });
    }

    public getCentreFormationByFormations_Id(courseId: number): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/CentreFormation/course/${courseId}`);
    }
}

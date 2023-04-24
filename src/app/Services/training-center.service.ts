import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TrainingCenter} from "../Entities/training-center";

@Injectable({
  providedIn: 'root'
})
export class TrainingCenterService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllTrainingCenters(): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/CentreFormation`);
  }
  public getTrainingCenterById(id: number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/CentreFormation/${id}`);
  }
  public addTrainingCenter(trainingCenter: any): Observable<any> {
    return this.http.post<any>(this.apiServerUrl + `/api/CentreFormation/add`,trainingCenter);
  }
  public updateTrainingCenter(trainingCenter: TrainingCenter): Observable<any> {
    return this.http.put<any>(this.apiServerUrl + `/api/CentreFormation/update`,trainingCenter);
  }
  public deleteTrainingCenter(id: number): Observable<any> {
    return this.http.delete<any>(this.apiServerUrl + `/api/CentreFormation/delete/${id}`);
  }
  public getAllByManagerId(managerId: number):Observable<any> {
    return this.http.get<any>(this.apiServerUrl+`/api/CentreFormation/manager/${managerId}`);
  }
  public affectFormationToCenter(formationId: number, centreId: number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/CentreFormation/${centreId}/formation/${formationId}`);
  }
  public affectCenterToCategory(categoryId: number, centreId: number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/CentreFormation/${centreId}/categorie/${categoryId}`);
  }
}

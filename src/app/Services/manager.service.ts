import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Manager} from "../Entities/manager";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllManagers(): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/manager`);
  }
  public getManagerById(id: number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/manager/${id}`);
  }
  public addManager(manager: any): Observable<any> {
    return this.http.post<any>(this.apiServerUrl + `/api/manager/add`,manager);
  }
  public updateManager(manager: Manager): Observable<any> {
    return this.http.put<any>(this.apiServerUrl + `/api/manager/update`,manager);
  }
  public deleteManager(id: number): Observable<any> {
    return this.http.delete<any>(this.apiServerUrl + `/api/manager/delete/${id}`);
  }

  public affectCenterToManager(centerId: number, managerId: number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/manager/${managerId}/center/${centerId}`);
  }
}

import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Manager} from "../Entities/manager";
import {AuthentificationService} from "./authentification.service";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient,
              private authentificationService: AuthentificationService) {
  }

  public getAllManagers(): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/manager`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }
  public getManagerById(id: number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/manager/${id}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }

  public findFirst10OrderByIdDesc(): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/manager/new`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }
  public addManager(manager: any): Observable<any> {
    return this.http.post<any>(this.apiServerUrl + `/api/manager/add`,manager);
  }
  public updateManager(manager: any): Observable<any> {
    return this.http.put<any>(this.apiServerUrl + `/api/manager/update`,manager,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }

  public updateManagerCheckout(manager: Manager): Observable<any> {
    return this.http.put<any>(this.apiServerUrl + `/api/manager/update/checkout`,manager,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }
  public deleteManager(id: number): Observable<any> {
    return this.http.delete<any>(this.apiServerUrl + `/api/manager/delete/${id}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }

  public affectCenterToManager(centerId: number, managerId: number): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/manager/${managerId}/center/${centerId}`);
  }

  public getManagersByAccountNonLocked(value: boolean): Observable<any> {
    return this.http.get<any>(this.apiServerUrl + `/api/manager/etat/${value}`,{
      headers:new HttpHeaders({ authorization : 'Bearer '+ this.authentificationService.getToken()})
    });
  }
}

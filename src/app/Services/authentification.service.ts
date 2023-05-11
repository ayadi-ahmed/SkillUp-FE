import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public login(request: any): Observable<any> {
        return this.http.post<any>(this.apiServerUrl + `/api/user/authenticate`, request);
    }

    public lockAccount(id: number): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/user/${id}`,{
            headers:new HttpHeaders({ authorization : 'Bearer '+ this.getToken()})
        });
    }

    public getUserByEmail(email: string): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/user/email/${email}`);
    }

    public getUserId() {
        return JSON.parse(localStorage.getItem('userId')!);
    }

    public setUserId(userId: number) {
        localStorage.setItem('userId', JSON.stringify(userId));
    }

    public getUserEmail() {
        return JSON.parse(localStorage.getItem('userEmail')!);
    }

    public setUserEmail(userEmail: number) {
        localStorage.setItem('userEmail', JSON.stringify(userEmail));
    }

    public setRoles(role: string) {
        localStorage.setItem('role', JSON.stringify(role));
    }

    public getRole(): string {
        return JSON.parse(localStorage.getItem('role')!);
    }

    public setToken(token: string) {
        localStorage.setItem('token', JSON.stringify(token));
    }

    public getToken(): string {
        return JSON.parse(localStorage.getItem('token')!);
    }

    public clear() {
        localStorage.clear();
    }

    public isLoggedIn() {
        return this.getRole();
    }
}

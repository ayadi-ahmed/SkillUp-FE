import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserAuthentificationService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {
    }

    public login(email: string, password: string): Observable<any> {
        return this.http.get<any>(this.apiServerUrl + `/api/user/login/${email}/${password}`);
    }

    public getUserId() {
        return JSON.parse(localStorage.getItem('userId')!);
    }

    public setUserId(userId: number) {
        localStorage.setItem('userId', JSON.stringify(userId));
    }

    public setRoles(role: string) {
        localStorage.setItem('role', JSON.stringify(role));
    }

    public getRole(): string {
        return JSON.parse(localStorage.getItem('role')!);
    }

    public clear() {
        localStorage.clear();
    }

    public isLoggedIn() {
        return this.getRole();
    }
}

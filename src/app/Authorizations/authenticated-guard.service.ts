import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthentificationService} from "../Services/authentification.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthenticatedGuardService implements CanActivate {

    constructor(private authentificationService: AuthentificationService, private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const currentUser = this.authentificationService.getRole();
        if (currentUser && (currentUser === 'MANAGER' || currentUser === 'CANDIDAT' || currentUser === 'ADMIN')) {
            this.router.navigate(['/error']);
            return false;
        } else {
            return true;
        }
    }
}

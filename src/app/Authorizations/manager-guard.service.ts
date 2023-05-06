import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthentificationService} from "../Services/authentification.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManagerGuardService implements CanActivate {

  constructor(private authentificationService: AuthentificationService, private router: Router) {
  }

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const currentUser = this.authentificationService.getRole();
    if (currentUser && currentUser === 'MANAGER') {
      return true;
    } else if (!currentUser) {
      this.router.navigate(['/login']);
      return false;
    } else {
      this.router.navigate(['/error']);
      return false;
    }
  }
}

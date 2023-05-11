import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../../Services/authentification.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import jwt_decode from "jwt-decode";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private userAuthentificationService: AuthentificationService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    public formData = {
        email: "",
        password: ""
    }

    public login() {
        this.userAuthentificationService.login(this.formData).subscribe(
            (response: any) => {
                var decoded = jwt_decode(response.token) as any;
                this.userAuthentificationService.setUserId(decoded.id);
                this.userAuthentificationService.setRoles(decoded.role);
                this.userAuthentificationService.setUserEmail(decoded.sub);
                this.userAuthentificationService.setToken(response.token);
                if (decoded.role === 'CANDIDAT') {
                    this.router.navigate(['/']);
                    setTimeout(function () {
                        window.location.reload();
                    }, 1);
                } else if (decoded.role == 'MANAGER') {
                    this.router.navigate(['/']);
                    setTimeout(function () {
                        window.location.reload();
                    }, 1);
                } else if (decoded.role == 'ADMIN') {
                    this.router.navigate(['/dashboard/stats']);
                    setTimeout(function () {
                        window.location.reload();
                    }, 1);
                }
            },
            (error: HttpErrorResponse) => {
                alert("Vérifier vos coordonnées!")
            }
        );
    }


}

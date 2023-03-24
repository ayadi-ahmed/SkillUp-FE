import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
    selector: 'app-signup-center',
    templateUrl: './signup-center.component.html',
    styleUrls: ['./signup-center.component.css']
})
export class SignupCenterComponent implements OnInit {


    public user = {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        address: '',
        tel: '',
        state: '',
        city: '',
        zip: '',
        password: ''
    }

    public center = {
        name: '', 
        tel: '',
        email: '',
        address: '',
        taxIdentificationNumber: '',
        creationDate: '',
        categorie: '',
        description: '',
        logo: ''
    }

    constructor() {
    }

    ngOnInit(): void {
    }

    submit() {
        console.log(this.user,this.center);
    }
}

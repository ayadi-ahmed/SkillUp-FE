import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-candidat',
  templateUrl: './signup-candidat.component.html',
  styleUrls: ['./signup-candidat.component.css']
})
export class SignupCandidatComponent implements OnInit {

  user = {
    nom: "",
    prenom: "",
    dateNaissance: "",
    tel: "",
    adresse: "",
    fonction: "",
    email: "",
    password: "",
    address: "",
    state: "",
    city: "",
    zip: ""
  }

  constructor() {

  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.user);
  }
}


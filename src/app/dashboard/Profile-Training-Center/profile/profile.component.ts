import { Component, OnInit } from '@angular/core';
import {Candidat} from "../../../Entities/candidat";
import {Router} from "@angular/router";
import {AuthentificationService} from "../../../Services/authentification.service";
import {CandidatService} from "../../../Services/candidat.service";
import {Manager} from "../../../Entities/manager";
import {ManagerService} from "../../../Services/manager.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: number = 0;
  userRole:string="";
  candidat:Candidat = {
    adresse: "",
    dateNaissance: "",
    email: "",
    fonction: "",
    id: 0,
    mdp: "",
    nom: "",
    prenom: "",
    role: "CANDIDAT",
    tel: 0
  };

  manager:Manager={
    centreFormation: [],
    dateNaissance: "",
    email: "",
    id: 0,
    mdp: "",
    nom: "",
    prenom: "",
    role: "MANAGER",
    tel: 0

  }

  constructor(public router: Router,
              private authService:AuthentificationService,
              private candidatService: CandidatService,
              private managerService: ManagerService) { }

  ngOnInit(): void {
    this.getCandidatId();
    this.getProfilByUserId(this.userId);
  }

  getCandidatId(){
    this.userId = this.authService.getUserId();
    this.userRole = this.authService.getRole();
  }
  getProfilByUserId(clientId:number){
    if (this.userRole == "CANDIDAT"){
      this.candidatService.getCandidatById(clientId).subscribe((res:Candidat)=>{
        this.candidat=res;
        console.log(this.candidat);
      });
    } else if (this.userRole == "MANAGER"){
      this.managerService.getManagerById(clientId).subscribe((res1:Manager)=>{
        this.manager = res1;
        console.log(this.manager);
      })
      //TODO elseif admin
    }

  }


  updateUser(m: Candidat) {
    this.candidatService.updateCandidat(this.candidat).subscribe((res2:Candidat)=>{
      console.log(res2);
    }),
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
  }
}

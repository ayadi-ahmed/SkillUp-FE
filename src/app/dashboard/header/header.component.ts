import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../Services/authentification.service";
import {ManagerService} from "../../Services/manager.service";
import {CandidatService} from "../../Services/candidat.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: any;
  public role: string = "";
  constructor(private authentificationService: AuthentificationService,
              private managerService: ManagerService,
              private candidatService: CandidatService) { }

  ngOnInit(): void {
    this.role = this.authentificationService.getRole();
    this.getUserConnected();
  }

  getUserConnected(){
    if (this.authentificationService.getRole() == 'CANDIDAT'){
      this.getCandidatById();
    }else if (this.authentificationService.getRole() == 'MANAGER'){
      this.getManagerById();
    }
  }
  getManagerById(){
    this.managerService.getManagerById(this.authentificationService.getUserId())
        .subscribe(value => this.user = value);
  }
  getCandidatById(){
    this.candidatService.getCandidatById(this.authentificationService.getUserId())
        .subscribe(value => this.user = value);
  }
}

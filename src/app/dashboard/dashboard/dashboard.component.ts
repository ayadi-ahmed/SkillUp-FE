import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthentificationService} from "../../Services/authentification.service";
import {CandidatService} from "../../Services/candidat.service";
import {Candidat} from "../../Entities/candidat";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(public router: Router) { }

  ngOnInit(): void {

  }


}

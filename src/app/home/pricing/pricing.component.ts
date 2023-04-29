import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../../Services/data.service";
import {ManagerService} from "../../Services/manager.service";
import {AuthentificationService} from "../../Services/authentification.service";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  public month : boolean = true;
  public year : boolean = false;
  constructor(private router: Router,
              private dataService: DataService) { }

  ngOnInit(): void {
  }

  public byMonth(){
    this.month = true;
    this.year = false;
  }
  public byYear(){
    this.year = true;
    this.month = false;
  }
  navigateToMyComponent(type: string, duree: string, prix: number) {
    this.dataService.setData({
      type: type,
      duree: duree,
      prix: prix
    });
    this.router.navigate(['/checkout-abonnement']);
  }
}

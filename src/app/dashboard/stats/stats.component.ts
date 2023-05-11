import { Component, OnInit } from '@angular/core';
import {FormationService} from "../../Services/formation.service";
import {ManagerService} from "../../Services/manager.service";
import {TransactionCentreService} from "../../Services/transaction-centre.service";
import {CandidatService} from "../../Services/candidat.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  coursesCount:number=0;
  managersCount:number=0;
  sumTransactionsCentres:number=0;
  clientsCount:number=0;
  constructor(private formationService:FormationService, private managerService:ManagerService,
              private transactionCentreService:TransactionCentreService,
              private candidatService:CandidatService) { }

  ngOnInit(): void {
    this.getCoursesCount();
    this.getManagersCount();
    this.getTransactionsCentresSum();
    this.getClientsCount();
  }
  getCoursesCount(){
    return this.formationService.getCoursesCount().subscribe((res=>{
      this.coursesCount=res;
    }))
  }

  getManagersCount(){
    return this.managerService.getManagersCount().subscribe((res1=>{
      this.managersCount=res1;
    }))
  }

  getTransactionsCentresSum(){
    return this.transactionCentreService.getSumTransactionsCentres().subscribe((res2=>{
      this.sumTransactionsCentres = res2;
    }))
  }

  getClientsCount(){
    return this.candidatService.getClientsCount().subscribe((res3=>{
      this.clientsCount= res3;
    }))
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { course } from 'src/app/Entities/courses';
import { FormationService } from 'src/app/Services/formation.service';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent implements OnInit {
  public formation:course={
    description:'',
    titre:'',
    img:'',
    dateDebut:'',
    dateFin:'',
    prx:0,
    nbMaxCan:0
  }
  constructor(private formationservice:FormationService, private router:Router){}
  ngOnInit(): void {
  }
  addFormation(){
    return this.formationservice.addFormation(this.formation).subscribe(data=>{
      console.log(data);
      this.formation=new course();
      this.router.navigate(['/']);
    })
  }
  


}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
first_name:any;
tel:any;
prenom:any;
mdp:any;
step=1;
typeUser='candidat'
  constructor() {
    
   }

  ngOnInit(): void {
  }
onSubmit(f:NgForm){

}
 nextStep() {
  this.step+=1;
}
previousStep() {
  this.step-=1;
}
typecandidat(){
this.typeUser='candidat';
this.step=1;
}
typecentre(){
  this.typeUser='centre';
  this.step=1;
  }
}

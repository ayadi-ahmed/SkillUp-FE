import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup-center',
  templateUrl: './signup-center.component.html',
  styleUrls: ['./signup-center.component.css']
})
export class SignupCenterComponent implements OnInit {


  public user = {
    name: '',
    email: '',
    address: '',
    tel: '',
    state: '',
    city: '',
    zip: '',
    password: ''
  }
  constructor() {}
  ngOnInit(): void {
  }

  submit() {
    console.log(this.user);
  }
}

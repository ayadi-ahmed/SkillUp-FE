import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent implements OnInit {
 formation!: FormGroup;
  constructor(private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.formation=this.formbuilder.group({
      sujet:[null],
      lieu:[null],
      dateDebut:[null],
      dateFin:[null],
      prix:[null]
    });
  }
  onsubmit(){
    console.log(this.formation.value)
  }

}

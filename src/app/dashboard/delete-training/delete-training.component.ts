import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormationService} from "../../Services/formation.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-delete-training',
  templateUrl: './delete-training.component.html',
  styleUrls: ['./delete-training.component.css']
})
export class DeleteTrainingComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private formationService: FormationService) { }

  ngOnInit(): void {
  }

  deleteTraining(){
    this.formationService.deleteFormation(this.data.id)
        .subscribe(
            (response: any) => {
              window.location.reload();
            },
            (error: HttpErrorResponse) => {
              console.log(error.message);
            }
        )
  }

}

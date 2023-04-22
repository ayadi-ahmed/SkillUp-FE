import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Tag} from "../../Entities/tag";
import {TagService} from "../../Services/tag.service";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  public tag: Tag = {
    id: 0,
    nom: ""
  }

  constructor(private tagService: TagService) {
  }

  ngOnInit(): void {
  }

  addNewTag() {
    this.tagService.addTag(this.tag)
        .subscribe(
            (response: any) => {
              window.location.reload();
            },
            (error: HttpErrorResponse) => {
              console.log(error.message);
            }
        )
  }

  add(){
      this.tagService.getTagByName(this.tag.nom)
          .subscribe(
              (response) => {
                  if (response != null){
                      alert('Tag already exists');
                  }else {
                      this.addNewTag();
                  }
              },
              (error: HttpErrorResponse) => {
                  console.log(error.message);
              }
          )
  }

}

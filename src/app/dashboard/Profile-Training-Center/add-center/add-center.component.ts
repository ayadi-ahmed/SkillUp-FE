import { Component, OnInit } from '@angular/core';
import {TrainingCenter} from "../../../Entities/training-center";
import {Category} from "../../../Entities/category";
import {CategorieService} from "../../../Services/categorie.service";
import {HttpErrorResponse} from "@angular/common/http";
import {TrainingCenterService} from "../../../Services/training-center.service";
import {AuthentificationService} from "../../../Services/authentification.service";
import {ManagerService} from "../../../Services/manager.service";
import {FormationService} from "../../../Services/formation.service";

@Component({
  selector: 'app-add-center',
  templateUrl: './add-center.component.html',
  styleUrls: ['./add-center.component.css']
})
export class AddCenterComponent implements OnInit {


  public center: TrainingCenter = {
    dateCreation: "",
    description: "",
    etatDemandeInscription: null,
    logo: "",
    matriculeFiscal: "",
    adresse: "",
    email: "",
    id: 0,
    manager: null,
    nom: "",
    rib: 0,
    tel: null
  }
  public image: any = {
    file : new File([],""),
    url : ""
  }
  public disableAddButton = false;
  public categoryId: any = '';
  public categories: Category[] = [];
  public centers: any[] = [];
  constructor(private categorieService: CategorieService,
              private trainingCenterService: TrainingCenterService,
              private authentificationService: AuthentificationService,
              private managerService: ManagerService,
              private formationService: FormationService) { }

  ngOnInit(): void {
    this.getCentersByManagerId();
    this.getAllCategories();
  }

  addCenter() {
    this.disableAddButton = true;
    const centerFormData = this.prepareFormData(this.center, this.image);
    this.trainingCenterService.addTrainingCenter(centerFormData)
        .subscribe(
            (response: TrainingCenter) => {
              this.trainingCenterService.affectCenterToCategory(this.categoryId, response.id)
                  .subscribe((response: any) => {
                    this.managerService
                        .affectCenterToManager(response.id, this.authentificationService.getUserId())
                        .subscribe(value => window.location.reload());
                  });
            },
            (error: HttpErrorResponse) => {
              console.log(error.message);
            }
        );
  }

  getAllCategories(){
    this.categorieService.getAllCategories()
        .subscribe(
            (response: Category[]) => {
              this.categories = response;
            },
            (error: HttpErrorResponse) => {
              console.log(error.message);
            }
        )
  }

  getCentersByManagerId() {
    this.trainingCenterService.getAllByManagerId(this.authentificationService.getUserId())
        .subscribe(
            (response: any) => {
                this.centers = response;
            },
            (error: HttpErrorResponse) => {
              console.log(error.message);
            }
        )
  }

  prepareFormData(formation: any, image: any): FormData{
    const formData = new FormData();
    formData.append(
        'centre',
        new Blob([JSON.stringify(formation)], {type: 'application/json'})
    );
    formData.append(
        'image',
        image.file,
        image.file.name
    );
    return formData;
  }

  onFileSelected(event: any){
    if (event.target.files){
      const file = event.target.files[0];
      this.image={
        file: file,
        url: null
      };
    }
  }
}

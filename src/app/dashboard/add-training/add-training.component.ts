import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {course} from 'src/app/Entities/courses';
import {FormationService} from 'src/app/Services/formation.service';
import {HttpErrorResponse} from "@angular/common/http";
import {AuthentificationService} from "../../Services/authentification.service";
import {TrainingCenterService} from "../../Services/training-center.service";
import {Subscription} from "rxjs";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {SeanceService} from "../../Services/seance.service";
import {Seance} from "../../Entities/Seance";

@Component({
    selector: 'app-add-training',
    templateUrl: './add-training.component.html',
    styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent implements OnInit, OnDestroy {
    form!: FormGroup;

    public formation: course = {
        id: 0,
        description: '',
        titre: '',
        img: '',
        dateDebut: '',
        dateFin: '',
        prix: null,
        nbMaxCan: null
    }
    public centers: any[] = [];
    public centerId: any = "";
    private subscription1: Subscription | undefined;
    private subscription2: Subscription | undefined;


    constructor(private formationservice: FormationService,
                private router: Router,
                private authentificationService: AuthentificationService,
                private trainingCenterService: TrainingCenterService,
                private seanceService: SeanceService) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            session: new FormArray([
                new FormGroup({
                    date: new FormControl(''),
                    heureDebut: new FormControl(''),
                    heureFin: new FormControl('')
                })
            ])
        });
        this.getCentersByManagerId()
    }

    get session(): FormArray {
        return this.form.get('session') as FormArray;
    }

    addSession() {
        this.session.push(
            new FormGroup({
                date: new FormControl(''),
                heureDebut: new FormControl(''),
                heureFin: new FormControl('')
            })
        );
    }

    getCentersByManagerId() {
        this.subscription1 = this.trainingCenterService.getAllByManagerId(this.authentificationService.getUserId())
            .subscribe(
                (response: any) => {
                    this.centers = response;
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    addFormation() {
        this.subscription2 = this.formationservice.addFormation(this.formation)
            .subscribe(
                (response: course) => {
                    for (let s of this.form.value.session) {
                        let seance = {
                            id: 0,
                            date: s.date,
                            heureDebut: s.heureDebut,
                            heureFin: s.heureFin
                        }
                        this.addSeance(seance, response.id);
                    }
                    this.trainingCenterService.affectFormationToCenter(response.id, this.centerId)
                        .subscribe(
                            (response: any) => {
                                window.location.reload();
                            },
                            (error: HttpErrorResponse) => {
                                console.log(error.message);
                            }
                        )
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                });
    }

    addSeance(seance: Seance, formationId: number) {
        this.seanceService.addSeance(seance).subscribe(
            (response: Seance) => {
                this.formationservice.affectSeanceToFormation(response.id, formationId).subscribe();
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    ngOnDestroy(): void {
        if (this.subscription1) {
            this.subscription1.unsubscribe();
        }
        if (this.subscription2) {
            this.subscription2.unsubscribe();
        }
    }

    getDetails(courseId: number) {
        this.router.navigate(['/course'], {queryParams: {id: courseId}});
    }

}

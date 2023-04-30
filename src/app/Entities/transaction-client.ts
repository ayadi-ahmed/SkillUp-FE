import {course} from "./courses";
import {Candidat} from "./candidat";

export interface TransactionClient {
  id: number
  date:string
  heure:string
  valeur:number
  client:Candidat
  formation: course
}

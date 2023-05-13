import {course} from "./courses";
import {Candidat} from "./candidat";

export interface Avis {
    id: number
    commentaire: string
    note: number
    date: string
    formation: course | null
    client: Candidat | null
}

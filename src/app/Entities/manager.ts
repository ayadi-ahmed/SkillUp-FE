import {TrainingCenter} from "./training-center";

export interface Manager{
    id: number
    email: string
    mdp: string
    role: string  | null
    nom: string
    prenom: string
    dateNaissance: string
    tel: number  | null
    centreFormation: TrainingCenter[]
    img: string
}


import {Abonnement} from "./abonnement";
import {TrainingCenter} from "./training-center";

export interface TransactionCenter{
    id: number
    date: string
    heure: string
    valeur: string
    abonnement: Abonnement
    centreFormation: TrainingCenter
}

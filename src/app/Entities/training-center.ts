import {Manager} from "./manager";

export interface TrainingCenter{
    id: number
    nom: string
    adresse: string
    tel: number  | null
    email: string
    rib: number
    manager: Manager | null
    matriculeFiscal: string
    dateCreation: string
    logo: string
    description: string
    etatDemandeInscription: string | null
}

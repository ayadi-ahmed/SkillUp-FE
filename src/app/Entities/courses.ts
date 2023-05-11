import {Manager} from "./manager";

export interface course{
    id: number,
    description : string,
    titre : string,
    img : string,
    dateDebut :string,
    dateFin :string,
    prix :number ,
    nbMaxCan : number | null,
    offres : number[]
}

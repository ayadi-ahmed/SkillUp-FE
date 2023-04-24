export interface course{
    id: number,
    description : string,
    titre : string,
    img : string,
    dateDebut :string,
    dateFin :string,
    prix :number | null,
    nbMaxCan : number | null,
    offres : number[]
}

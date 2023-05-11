export interface Candidat {
    id: number
    email: string
    mdp: string
    role: string  | null
    nom: string
    prenom: string
    dateNaissance: string
    tel: number | null
    adresse: string
    fonction: string
    img: string
}

import {ADD_COMPTEUR_COMMANDE,
        ADD_COMPTEUR_FACTURE,
        ADD_COMPTEUR_RETOUR, 
        INIT_COMPTEURS} from '../Constantes'


//Action: Ajoute 1 au compteur de commande
export const addCompteurCommande = () => {
    return {
        type: ADD_COMPTEUR_COMMANDE
    }
}

//Action: Ajoute 1 au compteur de facture
export const addCompteurFacture = () => {
    return {
        type: ADD_COMPTEUR_FACTURE
    }
}

//Action: Ajoute 1 au compteur de retour
export const addCompteurRetour = () => {
    return {
        type: ADD_COMPTEUR_RETOUR
    }
}

//Action: Remet en état initial les compteurs
export const initCompteurs = () => {
    return {
        type: INIT_COMPTEURS
    }
}
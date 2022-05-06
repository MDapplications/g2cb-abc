import {ADD_PREPA_FACT_DEPOT,
        ADD_ARTICLE_PREPA_FACT_DEPOT,
        ADD_BON_PREPA_FACT_DEPOT,
        REMOVE_PREPA_FACT_DEPOT,
        REMOVE_ALL_PREPA_FACT_DEPOT} from '../Constantes'


//Action: Ajout d'une Facture
export const addPrepaFactDepot = (data) => {
    return {
        type: ADD_PREPA_FACT_DEPOT,
        payload: data
    }
}


//Action: Ajout d'un article dans une prepa facture
export const addArticlePrepaFactDepot = article => {
    return {
        type: ADD_ARTICLE_PREPA_FACT_DEPOT,
        payload: article
    }
}


//Action: Ajout d'un article dans une prepa facture
export const addBonPrepaFactDepot = bon => {
    return {
        type: ADD_BON_PREPA_FACT_DEPOT,
        payload: bon
    }
}


//Action: Ajout d'un article dans une prepa facture
export const removePrepaFactDepot = id => {
    return {
        type: REMOVE_PREPA_FACT_DEPOT,
        payload: id
    }
}


//Action: Ajout d'un article dans une prepa facture
export const removeAllPrepaFactDepot = () => {
    return {
        type: REMOVE_ALL_PREPA_FACT_DEPOT
    }
}
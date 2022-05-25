import {    LOAD_FACTURE_MODIF,
            ADD_BON_FACTURE_MODIF,
            ADD_ARTICLE_FACTURE_MODIF,
            REMOVE_ARTICLE_FACTURE_MODIF,
            UPDATE_ARTICLE_FACTURE_MODIF,
            REMOVE_FACTURE_MODIF } from '../Constantes'


//initial state
const initialState = {
    id: '',
    date: '01/01/2022',
    montant: 0.0,
    nbArticles: 0,
    nbBons: 0,
    numFacture: '',
    regler: false,
    user_id: '',
    user_name: '',
    year: 2022,
    articles: [],
    bons: []
}

//récupération de la commande
const helperLoadData = facture => {
    return {
        id: facture.id,
        date: facture.date,
        montant: 0.0,
        nbArticles: facture.nb_articles,
        nbBons: facture.nb_bons,
        numFacture: facture.num_facture,
        user_id: facture.user_id,
        user_name: facture.user_name,
        year: facture.year,
        articles: [],
        bons: []
    }
}

//Ajout d'un bon
const helperAddBon = (state, bon) => {
    state.montant = state.montant - (bon.montant * 1)
    state.bons.push(bon)
    return state
}

//Ajout d'un article
const helperAddArticle = (state, article) => {
    state.montant = state.montant + (article.prix * article.quantite)
    state.articles.push(article)
    return state
}

//Ajout d'un article
const helperRemoveArticle = (state, article) => {
    state.nbArticles = Number(state.nbArticles - article.quantite)
    const resultMontant = Number(state.montant - (article.prix * article.quantite))
    resultMontant >= 0 ? state.montant = resultMontant : state.montant = 0
    state.articles = state.articles.filter(data => data.id !== article.id)
    return state
}

//mise à jour d'un article
const helperUpdateArticle = (state, article) => {
    const prevArticle = state.articles.find(data => data.id === article.id)
    state.articles = state.articles.filter(data => data.id !== article.id)

    //changement du prix
    if (prevArticle.prix !== article.prix) {
        const resultMontant = state.montant + (article.prix * article.quantite) - (prevArticle.prix * prevArticle.quantite) 
        resultMontant >= 0 ? state.montant = resultMontant : state.montant = 0
    } 

    state.articles.push(article)
    return state
}



//reducer
const reducerArticlesFacture = (state=initialState, action) => {

    switch (action.type) {
        
        case LOAD_FACTURE_MODIF: 
            state = helperLoadData(action.payload) 
            return state

        case ADD_BON_FACTURE_MODIF:  
            state = helperAddBon(state, action.payload)
            return state
            
        case ADD_ARTICLE_FACTURE_MODIF:   
            state = helperAddArticle(state, action.payload)
            return state  

        case REMOVE_ARTICLE_FACTURE_MODIF:
            state = helperRemoveArticle(state, action.payload)
            return state

        case UPDATE_ARTICLE_FACTURE_MODIF:
            state = helperUpdateArticle(state, action.payload)
            return state

        case REMOVE_FACTURE_MODIF:
            return initialState
            
        default: return state
    }
}

export default reducerArticlesFacture
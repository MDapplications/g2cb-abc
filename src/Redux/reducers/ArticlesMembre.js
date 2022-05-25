import { ADD_ARTICLE_MEMBRE, REMOVE_ARTICLE_MEMBRE, REMOVE_ALL_ARTICLE_MEMBRE } from '../Constantes'
import { v4 as uuiv4} from 'uuid'


//initial state
const initialState = {
    ArticlesMembre: []
}


//helper add Data
const helperAdddata = action => {
    return {
        id: uuiv4(),
        reference: action.payload.reference,
        prix: Number(action.payload.prix),
        quantite: Number(action.payload.quantite),
        variante: action.payload.variante,
        description: action.payload.description,
        destination: action.payload.destination,
        date: action.payload.date,
    }
}


//helper remove data
const removeDataById = (state, id) => {
    const Articles = state.filter(Article => Article.id !== id)
    return Articles
}





//reducer
const reducerArticleMembre = (state=initialState.ArticlesMembre, action) => {

    if(localStorage.getItem('ArticlesMembre')) {
        state = JSON.parse(localStorage.getItem('ArticlesMembre'))
    }

    switch (action.type) {
        case ADD_ARTICLE_MEMBRE:
            state = [...state, helperAdddata(action)]
            localStorage.setItem('ArticlesMembre', JSON.stringify(state))
            return state
            
        case REMOVE_ARTICLE_MEMBRE:
            state = removeDataById(state, action.payload)
            localStorage.setItem('ArticlesMembre', JSON.stringify(state))
            return state
         
        case REMOVE_ALL_ARTICLE_MEMBRE:
            state = []
            localStorage.setItem('ArticlesMembre', JSON.stringify(state))
            return state
            
        default: return state
    }
}

export default reducerArticleMembre
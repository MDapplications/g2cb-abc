import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducerArticleMembre from './reducers/ArticlesMembre'
import UserReducer from './reducers/Users'
import reducerBonMembre from './reducers/BonsMembre'
import reducerArticleStandby from './reducers/ArticlesStandby'
import reducerBonStandby from './reducers/BonsStandby'
import reducerCompteurs from './reducers/Compteurs'
import reducerCommandes from './reducers/Commandes'
import reducerParams from './reducers/Parametres'


const rootReducer = combineReducers({
    user: UserReducer,
    articlesMembre: reducerArticleMembre,
    bonsMembre: reducerBonMembre,
    articlesStandby: reducerArticleStandby,
    bonsStandby: reducerBonStandby,
    compteurs: reducerCompteurs,
    commandes: reducerCommandes,
    parametres: reducerParams,
    //ajouter les reducer ici
})


//creation du store et ajout du reducer
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
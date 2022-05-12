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
import reducerDepot from './reducers/Depot'
import reducerFactures from './reducers/Factures'
import reducerParams from './reducers/Parametres'
import reducerPrepaFactures from './reducers/PrepaFactures'
import reducerPrepaFactDepot from './reducers/PrepaFactDepot'
import reducerBonsDepot from './reducers/BonsDepot'
import reducerRetours from './reducers/Retours'
import reducerUtilisateurs from './reducers/Utilisateurs'


const rootReducer = combineReducers({
    user: UserReducer,
    articlesMembre: reducerArticleMembre,
    bonsMembre: reducerBonMembre,
    articlesStandby: reducerArticleStandby,
    bonsStandby: reducerBonStandby,
    prepaFactures: reducerPrepaFactures,
    compteurs: reducerCompteurs,
    commandes: reducerCommandes,
    factures: reducerFactures,
    depot: reducerDepot,
    bonsDepot: reducerBonsDepot,
    parametres: reducerParams,
    prepaFactDepot: reducerPrepaFactDepot,
    retours: reducerRetours,
    listUsers: reducerUtilisateurs
})


//creation du store et ajout du reducer
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
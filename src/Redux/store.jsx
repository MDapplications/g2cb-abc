import { configureStore } from '@reduxjs/toolkit'
//--------------------------  Reducers list  ----------------------------------//
import articlesMembre from './reducers/ArticlesMembre'
import user from './reducers/Users'
import bonsMembre from './reducers/BonsMembre'
import articlesStandby from './reducers/ArticlesStandby'
import bonsStandby from './reducers/BonsStandby'
import compteurs from './reducers/Compteurs'
import commandeModif from './reducers/ArticlesCommande'
import commandes from './reducers/Commandes'
import depot from './reducers/Depot'
import factures from './reducers/Factures'
import parametres from './reducers/Parametres'
import prepaFactures from './reducers/PrepaFactures'
import prepaFactDepot from './reducers/PrepaFactDepot'
import bonsDepot from './reducers/BonsDepot'
import retours from './reducers/Retours'
import listUsers from './reducers/Utilisateurs'
import factureModif from './reducers/ArticlesFacture'

//----- store -----//
export default configureStore({
    reducer: {
        user,
        articlesMembre,
        bonsMembre,
        articlesStandby,
        bonsStandby,
        prepaFactures,
        compteurs,
        commandeModif,
        commandes,
        factureModif,
        factures,
        depot,
        bonsDepot,
        parametres,
        prepaFactDepot,
        retours,
        listUsers
    } 
})
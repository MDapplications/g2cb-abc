import { createAction } from '@reduxjs/toolkit'
//-------------------  Create Action Redux  --------------------
export const initCompteurs = createAction('compteur/init')
export const addCompteurCommande = createAction('compteur/commande')
export const addCompteurFacture = createAction('compteur/facture')
export const addCompteurRetour = createAction('compteur/retour')
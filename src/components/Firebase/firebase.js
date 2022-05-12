import { initializeApp } from 'firebase/app'
import { getAnalytics } from "firebase/analytics"
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendPasswordResetEmail, 
    setPersistence,
    browserSessionPersistence} from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc, where, getDocs, collection, query, updateDoc, deleteDoc } from "firebase/firestore"

const {
        REACT_APP_FIREBASE_API_KEY,
        REACT_APP_FIREBASE_AUTH_DOMAIN,
        REACT_APP_FIREBASE_PROJECT_ID,
        REACT_APP_FIREBASE_STORAGE_BUCKET,
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        REACT_APP_FIREBASE_APP_ID,
        REACT_APP_FIREBASE_MEASUREMENT_ID,
    } = process.env



// Your web app's Firebase configuration
const config = {
    apiKey: `${REACT_APP_FIREBASE_API_KEY}`,
    authDomain: `${REACT_APP_FIREBASE_AUTH_DOMAIN}`,
    projectId: `${REACT_APP_FIREBASE_PROJECT_ID}`,
    storageBucket: `${REACT_APP_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${REACT_APP_FIREBASE_APP_ID}`,
    measurementId: `${REACT_APP_FIREBASE_MEASUREMENT_ID}`
}

class Firebase {

    //Constructeur
    constructor() {
        // Initialize Firebase
        this.app = initializeApp(config)
        this.analytics = getAnalytics(this.app)
        this.auth = getAuth()
        this.db = getFirestore(this.app)
        //this.persistence = setPersistence(this.auth, browserSessionPersistence)
    }

    
        
    //Inscription
    signupUser = (email, password) => createUserWithEmailAndPassword(this.auth, email, password)
    
    //Connexion
    loginUser = (email, password) => {
        return setPersistence(this.auth, browserSessionPersistence).then(() =>
          signInWithEmailAndPassword(this.auth, email, password)
        )
    }
    
    //Deconnexion
    signoutUser = () => signOut(this.auth)

    //Récuperer le mot de passe
    passwordReset = (email) => sendPasswordResetEmail(this.auth, email)



    //------------------------------------------------------------------------------------------
    //-------------------------------        USERS           -----------------------------------
    //------------------------------------------------------------------------------------------
    // enregistrer un user dans firestore
    /*
        @uid = uid provenant de l'api authentification de firebase
        @user = data contenant pseudo & email
    */
    addUser = (uid, user) => setDoc(doc(this.db, "users", uid), user)

    // récupération d'un user dans firestore
    /*
        @uid = uid provenant de l'api authentification de firebase
        l'UID a été utilisé pour l'enregistrement c'est donc grace à lui que l'on récupére la data lié 
    */
    getUser = (uid) => getDoc(doc(this.db, "users", uid))

    // Mise à jour du role d'un utilisateur
    updateAdminUser = (uid, data) => updateDoc(doc(this.db, "users", uid), {role: data})

    // Enregistrement des données postale dans le document utilisateur
    updateAdresseUser = (uid, data) => updateDoc(doc(this.db, "users", uid), {
        adresse: data.adresse,
        cp: data.cp,
        ville: data.ville
    })


    //------------------------------------------------------------------------------------------
    //-------------------------------        PARAMETRES           -----------------------------------
    //------------------------------------------------------------------------------------------
    // récupération d'un user dans firestore
    /*
        @uid = uid provenant de l'api authentification de firebase
        l'UID a été utilisé pour l'enregistrement c'est donc grace à lui que l'on récupére la data lié 
    */
    getParams = () => getDoc(doc(this.db, "params", '0'))

    // Mise à jour du role d'un utilisateur
    updateParams = (data) => updateDoc(doc(this.db, "params", '0'), {
        adresse: data.adresse,
        code_postal: data.code_postal,
        ville: data.ville,
        club: data.club,
        sendmail: data.sendmail
    })


    //------------------------------------------------------------------------------------------
    //-------------------------------        ARTICLES        -----------------------------------
    //------------------------------------------------------------------------------------------
    //enregistrer un articles dans firestore
    addArticle = (uid, article) => setDoc(doc(this.db, "articles", uid), article)

    // récupération d'un article dans firestore
    getArticle = (uid) => getDoc(doc(this.db, "articles", uid))

    // récupérer tous les articles dans firestore
    getAllArticle = () => getDocs(collection(this.db, "articles"))

    //Supprimer un document
    deleteArticle = (uid) => deleteDoc(doc(this.db, "articles", uid))
    

    //récupération de la liste d'article en attentes
    getArticleStandby = () => getDocs(query(collection(this.db, "articles"), where("standby", "==", true)))

    //récupération de la liste d'article en attentes
    getArticleDepot = () => getDocs(query(collection(this.db, "articles"), where("depot", "==", true)))

    // L'article n'est plus en attente
    updateArticleStandby = (uid) => updateDoc(doc(this.db, "articles", uid), {standby: false})

    //L'article sera mise dans une commande
    enableForCommandeArticle = (uid) => updateDoc(doc(this.db, "articles", uid), {forCommande: true})
    //La commande ne sera pas mise dans une commande
    disableForCommandeArticle = (uid) => updateDoc(doc(this.db, "articles", uid), {forCommande: false})

    //L'article sera mise dans une commande
    enableForFactureArticle = (uid) => updateDoc(doc(this.db, "articles", uid), {forFacture: true})
    //La commande ne sera pas mise dans une commande
    disableForFactureArticle = (uid) => updateDoc(doc(this.db, "articles", uid), {forFacture: false})

    //L'article sera mise dans une commande
    enableForRetourArticle = (uid) => updateDoc(doc(this.db, "articles", uid), {forRetour: true})
    //La commande ne sera pas mise dans une commande
    disableForRetourArticle = (uid) => updateDoc(doc(this.db, "articles", uid), {forRetour: false})

    //L'article sera faite par le club
    changeClubArticle = (uid, value) => updateDoc(doc(this.db, "articles", uid), {user_name: value})

    //récupération de la liste d'article d'une commande
    getArticleCommande = (num_commande) => getDocs(query(collection(this.db, "articles"), where("commande", "==", num_commande)))

    //récupération de la liste d'article d'une facture
    getArticleFacture = (num_facture) => getDocs(query(collection(this.db, "articles"), where("facture", "==", num_facture)))

    //récupération de la liste d'article d'un bon de retour
    getArticleRetour = (num_retour) => getDocs(query(collection(this.db, "articles"), where("retour", "==", num_retour)))

    //L'article est ajouté à une commande
    addArticleCommande = (uid, data) => updateDoc(doc(this.db, "articles", uid), {
        commande: data.commande,
        forCommande: false,
        standby: false,
        depot: data.depot
    })

    //L'article est ajouté à une facture
    addArticleFacture = (uid, numFacture) => updateDoc(doc(this.db, "articles", uid), {
        facture: numFacture,
        forFacture: false,
        depot: false
    })

    //L'article est ajouté à un bon de retour
    addArticleRetour = (uid, numRetour) => updateDoc(doc(this.db, "articles", uid), {
        retour: numRetour,
        forRetour: false,
        depot: false
    })


    //------------------------------------------------------------------------------------------
    //-------------------------------          BONS          -----------------------------------
    //------------------------------------------------------------------------------------------
    //enregistrer un bon dans firestore
    addBon = (uid, article) => setDoc(doc(this.db, "bons", uid), article)

    //récupération d'un bon dans firestore
    getBon = (uid) => getDoc(doc(this.db, "bons", uid))

    // récupérer tous les bon dans firestore
    getAllBon = () => getDocs(collection(this.db, "bons"))

    //Supprimer un document
    deleteBon = (uid) => deleteDoc(doc(this.db, "bons", uid))

    //récupération de la liste des bons en attentes
    getBonStandby = () => getDocs(query(collection(this.db, "bons"), where("standby", "==", true)))

    //récupération de la liste de bon en dépot
    getBonDepot = () => getDocs(query(collection(this.db, "bons"), where("facture", "==", ""), where("commande", "!=", "")))

    //Le bon sera mise dans une commande
    enableForCommandeBon = (uid) => updateDoc(doc(this.db, "bons", uid), {forCommande: true})
    //Le bon ne sera pas mise dans une commande
    disableForCommandeBon = (uid) => updateDoc(doc(this.db, "bons", uid), {forCommande: false})

    //Le bon sera mise dans une commande
    enableForFactureBon = (uid) => updateDoc(doc(this.db, "bons", uid), {forFacture: true})
    //Le bon ne sera pas mise dans une commande
    disableForFactureBon = (uid) => updateDoc(doc(this.db, "bons", uid), {forFacture: false})

    //récupération de la liste de bon d'une commande
    getBonCommande = (num_commande) => getDocs(query(collection(this.db, "bons"), where("commande", "==", num_commande)))

    //récupération de la liste de bon d'une facture
    getBonFacture = (num_facture) => getDocs(query(collection(this.db, "bons"), where("facture", "==", num_facture)))
    
    //L'article est ajouté à une commande
    addBonCommande = (uid, num_commande) => updateDoc(doc(this.db, "bons", uid), {
        commande: num_commande,
        forCommande: false,
        standby: false,
    })

    //L'article est ajouté à une facture
    addBonFacture = (uid, numFacture) => updateDoc(doc(this.db, "bons", uid), {
        facture: numFacture,
        forFacture: false
    })


    //------------------------------------------------------------------------------------------
    //-------------------------------        COMMANDES        ----------------------------------
    //------------------------------------------------------------------------------------------
    //enregistrer une commande dans firestore
    addCommande = (id, commande) => setDoc(doc(this.db, "commandes", id), commande)

    //récupération d'un bon dans firestore
    getCommande = (idCommande) => getDoc(doc(this.db, "commandes", idCommande))

    //récupération de la liste des commandes de l'année en cours
    getCommandes = (year) => getDocs(query(collection(this.db, "commandes"), where("year", "==", year)))


    //------------------------------------------------------------------------------------------
    //-------------------------------        FACTURES        ----------------------------------
    //------------------------------------------------------------------------------------------
    //enregistrer une fature dans firestore
    addFacture = (id, facture) => setDoc(doc(this.db, "factures", id), facture)

    //récupération de la liste des factures de l'année en cours
    getFactures = (year) => getDocs(query(collection(this.db, "factures"), where("year", "==", year)))


    //Le bon sera mise dans une commande
    enableReglerFacture = (uid) => updateDoc(doc(this.db, "factures", uid), {regler: true})
    //Le bon ne sera pas mise dans une commande
    disableReglerFacture = (uid) => updateDoc(doc(this.db, "factures", uid), {regler: false})


    //------------------------------------------------------------------------------------------
    //---------------------------------        RETOURS        ----------------------------------
    //------------------------------------------------------------------------------------------
    //enregistrer une commande dans firestore
    addRetour = (id, retour) => setDoc(doc(this.db, "retours", id), retour)

    //récupération de la liste des commandes de l'année en cours
    getRetours = (year) => getDocs(query(collection(this.db, "retours"), where("year", "==", year)))

    //Le bon sera mise dans une commande
    enableRetournerRetour = (uid) => updateDoc(doc(this.db, "retours", uid), {retourner: true})
    //Le bon ne sera pas mise dans une commande
    disableRetournerRetour = (uid) => updateDoc(doc(this.db, "retours", uid), {retourner: false})

}

export default Firebase
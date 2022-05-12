import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Button, Table } from 'react-bootstrap'
import { Logo } from '../Logo'
import "./style.css"


const CommandePrint = () => {

    //Constantes
    const dataCommande = {
        id: 0,
        date: '',
        montant: 0,
        nbArticles: 0,
        nbBons: 0,
        numCommande: '',
        user_id: 0,
        user_name: '',
        year: 0,
        articles: [],
        bons: [],
    }


    //Hooks
    const navigate = useNavigate()
    const { commandeId } = useParams()

    //Selector (redux)
    const user = useSelector(state => state.user)
    const listCommandes = useSelector(state => state.commandes)
   

    //State
    const [currentCommande, setCurrentCommande] = useState(dataCommande)
     

    //redirection vers home
    useEffect(() => {
        if (user.role < 2) {
            navigate('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])



    // Au chargement du composant
    useEffect(() => {
        if (currentCommande.id === 0) {
            const commande = listCommandes.find(data => data.id === commandeId)
            if (commande) {
                setCurrentCommande(commande)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCommande, commandeId])


    const handleBack = () => {
        navigate(-1)
    }

    const handlePrint = () => {
        window.print()
    }
    
    const tableStyle = {
        paddingTop: '2px',
        paddingBottom: '2px'
    }

    const tableCenterStyle = {
        paddingTop: '2px',
        paddingBottom: '2px',
        textAlign: 'center'
    }

    //Affiche les articles
    const displaylistArticle = currentCommande.nbArticles > 0 && 
        currentCommande.articles.map(article => {
            return (
                <tr key={article.id}>
                    <td style={tableCenterStyle}>{article.destination ? 'F' : 'D'}</td>
                    <td style={tableStyle}>{article.reference}</td>
                    <td style={tableStyle}>{article.description}</td>
                    <td style={tableCenterStyle}>{article.variante}</td>
                    <td style={tableCenterStyle}>
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(article.prix)}
                    </td>
                    <td style={tableCenterStyle}>{article.quantite}</td>
                    <td style={tableCenterStyle}>
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(article.prix * article.quantite)}
                    </td>
                    <td style={tableCenterStyle}>{article.user_name}</td>
                </tr>                    
            )
    })


    //Affiche les articles
    const displaylistBon = currentCommande.nbBons > 0 && 
        currentCommande.bons.map(bon => {
            return (
                <tr key={bon.id}>
                    <td style={tableCenterStyle}></td>
                    <td style={tableStyle}>{bon.reference}</td>
                    <td style={tableStyle}>Bon de réduction</td>
                    <td style={tableCenterStyle}></td>
                    <td style={tableCenterStyle}></td>
                    <td style={tableCenterStyle}>1</td>
                    <td style={tableCenterStyle}>
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(bon.montant)}
                    </td>
                    <td style={tableCenterStyle}>{bon.user_name}</td>
                </tr>
            )
    })



    return (
        <div id='commandePrint'>
            <div className='box wide hidden-on-narrow d-print-none'>
                <div className='box-col' />
                <Button variant='primary' className='me-2' onClick={handleBack}>Retour</Button>
                <Button variant='success' className='me-2' onClick={handlePrint}>Imprimer</Button>
                <div className='box-col' />
            </div>

            <div className="page-container hidden-on-narrow">
                <div className="pdf-page size-a4-paysage paysage">
                <div className="inner-page">
                    <div className="pdf-header d-flex justify-content-between">
                        <span>
                            <h4 className="ms-2">{currentCommande.date + ' - Bon de commande du club A.B.C.'} </h4>
                        </span>
                        <span className="invoice-number pt-0"><span style={{textDecoration: 'underline'}}>Numero de commande</span> : {currentCommande.numCommande}</span>
                    </div>

                    <div className="pdf-footer d-flex justify-content-between">
                        <div>
                            Commande : {currentCommande.numCommande}
                        </div>
                        <div>
                            Association de Badminton Cosacien
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <div className="addresses ms-2">
                            <div className="for">
                                <h6>Adresse de livraison</h6>
                                <p>
                                {user.prenom + ' ' + user.nom}
                                <br/>
                                {user.adresse}
                                <br/>
                                {user.code_postal + ' - ' + user.ville}
                                </p>
                            </div>
                        </div>
                        <div className="from">
                            <img src={Logo} alt="Logo" width="75" height="75"/>
                        </div>
                    </div>

                    <div className="pdf-body">
                        <div id="grid">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={tableCenterStyle}>D/F</th>
                                        <th style={tableCenterStyle}>Référence</th>
                                        <th style={tableCenterStyle}>Description</th>
                                        <th style={tableCenterStyle}>Variantes</th>
                                        <th style={tableCenterStyle}>Prix</th>
                                        <th style={tableCenterStyle}>Qté</th>
                                        <th style={tableCenterStyle}>Montant</th>
                                        <th style={tableCenterStyle}>Membre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displaylistArticle}
                                    {displaylistBon}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan='2'></td>
                                        <td 
                                            className='text-end'
                                            style={tableStyle}>
                                            <b>Nombres de bon de réduction total :</b>
                                        </td>
                                        <td style={tableCenterStyle}>{currentCommande.nbBons}</td>
                                        <td colSpan='4'></td>
                                    </tr>
                                    <tr>
                                        <td colSpan='2'></td>
                                        <td 
                                            className='text-end'
                                            style={tableStyle}>
                                            <b>Nombres d'articles :</b>
                                        </td>
                                        <td style={tableCenterStyle}>{currentCommande.nbArticles}</td>
                                        <td colSpan='2'
                                            style={tableStyle}>
                                            <b>Sous Total :</b>
                                        </td>
                                        <td style={tableCenterStyle}>
                                            {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(currentCommande.montant)}
                                        </td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div className='d-print-none' style={{paddingBottom: '45px'}}/>
        </div>
  );
}

export default CommandePrint





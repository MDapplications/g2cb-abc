import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {Button, Table} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Logo } from '../Logo'
import './style.css'


const FacturePrint = () => {

    //Constantes
    const dataFacture = {
        id: 0,
        date: '',
        montant: 0,
        nbArticles: 0,
        nbBons: 0,
        numFacture: '',
        user_id: 0,
        user_name: '',
        year: 0,
        articles: [],
        bons: [],
    }


    //Hooks
    const navigate = useNavigate()
    const { factureId } = useParams()

    //Selector (redux)
    const user = useSelector(state => state.user)
    const listFactures = useSelector(state => state.factures)
    const parametres = useSelector(state => state.parametres)
    

    //State
    const [currentFacture, setCurrentFacture] = useState(dataFacture)
     

    //redirection vers home
    useEffect(() => {
        if (user.role < 2) {
            navigate('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]) 



    // Au chargement du composant
    useEffect(() => {
        if (currentFacture.id === 0) {
            const facture = listFactures.find(data => data.id === factureId)
            if (facture) {
                setCurrentFacture(facture)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFacture, factureId])


    //Retour page précédente
    const handleBack = () => {
        navigate(-1)
    }

    //affichage de l'aperçu pour impression
    const handlePrint = () => {
        window.print()
    }
    
    //Styles
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
    const displaylistArticle = currentFacture.nbArticles > 0 && 
        currentFacture.articles.map(article => {
            return (
                <tr key={article.id}>
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
                </tr>                    
            )
    })


    //Affiche les bons
    const displaylistBon = currentFacture.nbBons > 0 && 
        currentFacture.bons.map(bon => {
            return (
                <tr key={bon.id}>
                    <td style={tableStyle}>{bon.reference}</td>
                    <td style={tableStyle}>Bon de réduction</td>
                    <td style={tableCenterStyle}></td>
                    <td style={tableCenterStyle}></td>
                    <td style={tableCenterStyle}>1</td>
                    <td style={tableCenterStyle}>
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(bon.montant)}
                    </td>
                </tr>
            )
    })



    //render
    return (
        <div id='facturePrint'>
            <div className='box wide hidden-on-narrow d-print-none'>
                <div className='box-col' />
                <Button variant='primary' className='me-2' onClick={handleBack}>Retour</Button>
                <Button variant='success' className='me-2' onClick={handlePrint}>Imprimer</Button>
                <div className='box-col' />
            </div>

            <div className='page-container hidden-on-narrow'>
                <div className='pdf-page size-a4-portrait'>
                <div className='inner-page'>
                    <div className='pdf-header d-flex justify-content-between'>
                        <span>
                            <h4 className='ms-2'>{currentFacture.date + ' - Facture club A.B.C.'} </h4>
                        </span>
                        <span className='invoice-number pt-0'><span style={{textDecoration: 'underline'}}>Numero de facture</span> : {currentFacture.numFacture}</span>
                    </div>

                    <div className='d-flex justify-content-between'>
                        <div className='addresses ms-2'>
                            <div className='for'>
                                <p className='mb-0'>Facturer à :</p>
                                <h4>
                                    {currentFacture.user_name}
                                </h4>
                            </div>
                        </div>
                        <div className='from mb-1 d-flex justify-content-between addresses'>
                            <div>
                                <img src={Logo} alt='Logo' width='60' height='60'/>
                            </div>
                            <div className='ms-2'> 
                                <p className='mb-0'>Le chèque est à mettre à l'odre de :</p>
                                <h6>{parametres.club}</h6>
                            </div>
                        </div>
                    </div>

                    <div className='pdf-body'>
                        <div id='grid'>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={tableCenterStyle}>Référence</th>
                                        <th style={tableCenterStyle}>Description</th>
                                        <th style={tableCenterStyle}>Variantes</th>
                                        <th style={tableCenterStyle}>Prix</th>
                                        <th style={tableCenterStyle}>Qté</th>
                                        <th style={tableCenterStyle}>Montant</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displaylistArticle}
                                    {displaylistBon}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan='2'
                                            className='text-end'
                                            style={tableStyle}>
                                            <b>Nombres de bon de réduction total :</b>
                                        </td>
                                        <td style={tableCenterStyle}>{currentFacture.nbBons}</td>
                                        <td colSpan='4'></td>
                                    </tr>
                                    <tr>
                                        <td colSpan='2'
                                            className='text-end'
                                            style={tableStyle}>
                                            <b>Nombres d'articles :</b>
                                        </td>
                                        <td style={tableCenterStyle}>{currentFacture.nbArticles}</td>
                                        <td colSpan='2'
                                            style={tableStyle}>
                                            <h6 className='my-1'>Sous Total :</h6>
                                        </td>
                                        <td style={tableCenterStyle}>
                                            <h6 className='my-1'>
                                                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(currentFacture.montant)}
                                            </h6>
                                        </td>
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

export default FacturePrint





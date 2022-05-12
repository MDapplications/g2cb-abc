import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {Button, Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./style.css"
import Logo from '../../images/logo NB.png'
import { useSelector } from "react-redux"




const RetourPrint = () => {

    //Constantes
    const dataRetour = {
        id: 0,
        date: '',
        montant: 0,
        nbArticles: 0,
        numCommande: '',
        user_id: 0,
        user_name: '',
        year: 0,
        articles: [],
    }


    //Hooks
    const navigate = useNavigate()
    const { retourId } = useParams()

    //Selector (redux)
    const user = useSelector(state => state.user)
    const listRetours = useSelector(state => state.retours)
    

    //State
    const [currentRetour, setCurrentRetour] = useState(dataRetour)
     

    //redirection vers home
    useEffect(() => {
        if (user.role < 2) {
            navigate('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])



    // Au chargement du composant
    useEffect(() => {
        if (currentRetour.id === 0) {
            const retour = listRetours.find(data => data.id === retourId)
            if (retour) {
                setCurrentRetour(retour)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRetour, retourId])


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
    const displaylistArticle = currentRetour.nbArticles > 0 && 
        currentRetour.articles.map(article => {
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


    return (
        <div id='retourPrint'>
            <div className='box wide hidden-on-narrow d-print-none'>
                <div className='box-col' />
                <Button variant='primary' className='me-2' onClick={handleBack}>Retour</Button>
                <Button variant='success' className='me-2' onClick={handlePrint}>Imprimer</Button>
                <div className='box-col' />
            </div>

            <div className="page-container hidden-on-narrow">
                <div className="pdf-page size-a4-paysage">
                <div className="inner-page">
                    <div className="pdf-header d-flex justify-content-between">
                        <span>
                            <h4 className="ms-2">{currentRetour.date + ' - Bon de retour du club A.B.C.'} </h4>
                        </span>
                        <span className="invoice-number pt-0"><span style={{textDecoration: 'underline'}}>Bon de retour</span> : {currentRetour.numRetour}</span>
                    </div>

                    <div className="pdf-footer d-flex justify-content-between">
                        <div>
                            Bon de retour : {currentRetour.numRetour}
                        </div>
                        <div>
                            Association de Badminton Cosacien
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <div className="addresses ms-2">
                            <div className="for">
                                <div className='mb-3'>
                                    Nom Prenom :
                                </div>
                                <div className='mb-4'>
                                    Adresse :
                                </div>
                                <div className='mb-5'>
                                    Siganture :
                                </div>
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
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td 
                                            className='text-end'
                                            style={tableStyle}>
                                            <b>Nombres d'articles :</b>
                                        </td>
                                        <td style={tableCenterStyle}>{currentRetour.nbArticles}</td>
                                        <td colSpan='2'
                                            style={tableStyle}>
                                            <h6 className='my-1'>Sous Total :</h6>
                                        </td>
                                        <td style={tableCenterStyle}>
                                            <h6 className='my-1'>
                                                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(currentRetour.montant)}
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

export default RetourPrint





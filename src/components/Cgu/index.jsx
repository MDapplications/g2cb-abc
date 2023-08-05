import React from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const Cgu = () => {

    //Hooks
    const navigate = useNavigate()

    //Retour page précédente
    const handleBack = () => navigate(-1)


    return (
        <>
            <div className='box wide hidden-on-narrow'>
                <div className='box-col' />
                <Button variant='primary' className='me-2' onClick={handleBack}>Retour</Button>
                <div className='box-col' />
            </div>
            <div className='px-5 mb-5'>
                
                <h1 className='py-3 pt-5'>Condition Général d'utilisation</h1>
                <p>
                    Vous êtes actuellement connecté au site internet <Link to='/'>abc.md-ev.ovh</Link>. 
                    En accédant à ce site, vous vous engagez à vous conformer à la réglementation en vigueur ainsi qu'aux présentes conditions d'utilisation.
                </p>
                <p>
                    Les présentes conditions d'utilisation peuvent être mises mises à jour, 
                    nous vous invitons à consulter cette page à l'occasion de chaque connexion à ce site.
                </p>

                <h4 className='py-3'>Services fournis</h4>
                <p>
                    La plateforme ABC, s’efforce de fournir sur le site <Link to='/'>abc.md-ev.ovh</Link> des 
                    informations aussi précises que possible. 
                    Toutes les informations indiquées sur le site sont données à titre indicatif, 
                    et sont susceptibles de changer ou d’évoluer sans préavis.
                </p>
                <p>
                    Toutefois, il ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, 
                    qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                </p>
                <p>
                    Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, 
                    merci de bien vouloir le signaler par email, à l’adresse <i>contact@md-ev.ovh</i>, 
                    en décrivant le problème de la manière la plus précise possible (vous vous trouver sur un téléphone, 
                    une tablette ou bien un ordinateur ; nom de la page qui pose problème, type de système d’exploitation, 
                    navigateur utilisé, …)
                </p>

                <h4 className='py-3'>Protection des données personnelles</h4>
                <p>La plateforme ABC est susceptible de recueillir :</p>
                <p>
                Des données fournies volontairement par l’utilisateur : nom, prénoms, email, adresse, ...
                Des données telles que l’adresse IP, la date et heure de la visite sur le site, la 
                durée et les pages consultées, ...
                Les informations recueillies ont pour but soit de vous identifier formellement pour 
                vous donner accès à un espace sécurisé soit pour le besoin de certains services proposés par le site.
                L'adresse postale est uniquement utilisée pour être remplis automatiquement dans les documents 
                qui le nécessite (Commande, Bon de retour, ...).
                </p>
                <p>
                Aucune information personnelle de l’utilisateur du site n’est publiée à l’insu de l’utilisateur, 
                échangée, transférée, cédée ou vendue sur un support quelconque à des tiers.
                </p>

                <h4 className='py-3'>Limitation de responsabilité</h4>
                <p>
                L’utilisateur du site s’engage à accéder au site en utilisant un matériel récent, 
                ne contenant pas de virus et avec un navigateur de dernière génération mis-à-jour. 
                </p>
                
                <p>
                La plateforme ABC ne pourra être tenue responsable des dommages directs et indirects causés 
                au matériel de l’utilisateur, lors de l’accès au site <Link to='/'>abc.md-ev.ovh</Link>, et résultant 
                soit de l’utilisation d’un matériel ne répondant pas aux spécifications indiquées 
                ci-dessus, soit de l’apparition d’un bug ou d’une incompatibilité.
                </p>
                <p>
                La plateforme ABC ne pourra également être tenue responsable des dommages indirects consécutifs 
                à l’utilisation du site.
                </p>
                <p>
                Les liens hypertextes établis directement ou indirectement par ce site peuvent orienter 
                l'utilisateur vers des sites extérieurs dont le contenu ne peut en aucune manière engager 
                la responsabilité de La plateforme ABC.
                </p>

                <h4 className='py-3'>Loi applicables</h4>
                <p>
                Les présentes conditions du site sont régies par les lois françaises et toute contestation 
                ou litiges qui pourraient naître de l'interprétation ou de l'exécution de celles-ci seront 
                de la compétence exclusive des tribunaux dont dépend le siège social de l'Association de 
                Badminton Cosacien.
                </p>
                <p className='pb-5'>La langue de référence, pour le règlement de contentieux éventuels, est le français.</p>
                
            </div>
        </>
        
    )
}

export default Cgu

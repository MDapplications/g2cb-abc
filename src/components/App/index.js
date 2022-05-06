import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import '../../App.css'
import ErrorPage from '../ErrorPage';
import Footer from '../Footer';
import Header from '../Header';
import Mentions from '../Mentions';
import Welcome from '../Welcome';
import Home from '../Home';
import ForgetPassword from '../ForgetPassword';
import Cgu from '../Cgu';
import Dashboard from '../Dashboard';
import AddArticle from '../../containers/AddArticle';
import AddBon from '../../containers/AddBon';
import Commandes from '../Commandes';
import Factures from '../Factures';
import Depots from '../Depots';
import Retours from '../Retours';
import GestionUsers from '../GestionUsers';
import StandbyArticle from '../StandbyArticle';
import CommandePrint from '../CommandePrint';
import FacturePrint from '../FacturePrint';
import Parametres from '../Parametres';


function App() {
  return (
    <Router>
      <Header/>
 
         <Routes>
          <Route path='/login' element={<Welcome/>}/>
          <Route path='/forgetPassword' element={<ForgetPassword/>}/>

          <Route path="/" element={<Home/>}>
            <Route index element={<AddArticle/>}/> 
            <Route path="article" element={<AddArticle/>}/>
            <Route path="bon" element={<AddBon/>}/>
          </Route>

          <Route path='/admin' element={<Dashboard/>}>
            <Route index element={<StandbyArticle/>}/> 
            <Route path='commandes' element={<Commandes/>}/>
            <Route path='factures' element={<Factures/>}/>
            <Route path='depots' element={<Depots/>}/>
            <Route path='retours' element={<Retours/>}/>
            <Route path='users' element={<GestionUsers/>}/>
            <Route path='parametres' element={<Parametres/>}/>
          </Route>
          
          <Route path='/commandePrint/:commandeId' element={<CommandePrint/>}></Route>
          <Route path='/facturePrint/:factureId' element={<FacturePrint/>}></Route>

          <Route path='/mentions' element={<Mentions/>}/>
          <Route path='/conditions' element={<Cgu/>}/>

          <Route path='*' element={<ErrorPage/>}/>
        </Routes>

      <Footer/>
      
    </Router>
  )
}

export default App;

import React from 'react'
import App from './components/App'
import { createRoot } from 'react-dom/client'
import { Provider as Redux } from 'react-redux'
import Firebase, { FirebaseContext } from './components/Firebase'
import store from './Redux/store'
import 'bootstrap/dist/css/bootstrap.min.css'

const container = document.getElementById('app')
const root = createRoot(container)

root.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Redux store={store}>
      <App/>
    </Redux>
  </FirebaseContext.Provider>    
)

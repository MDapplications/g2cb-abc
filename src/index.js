import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import Firebase, { FirebaseContext } from './components/Firebase'
import store from './Redux/store'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Provider store={store}>
      <App/>
    </Provider>
  </FirebaseContext.Provider>    
)

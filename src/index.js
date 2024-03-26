import React from 'react'
import { useRoutes, HashRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import './index.css'
import App1 from './App'
import App2 from './pages/login'
import App3 from './pages/user'
import App4 from './pages/other'
import Operate from './pages/Operate'

import reportWebVitals from './reportWebVitals'

const routes = [
  {
    path: '/',
    element: <App1 />
  },
  {
    path: '/login',
    element: <App2 />
  },
  {
    path: '/user',
    element: <App3 />
  },
  {
    path: '/other',
    element: <App4 />
  },
  {
    path: '/operate',
    element: <Operate />
  }
]
function RouterView () {
  const elem = useRoutes(routes)
  return elem
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <RouterView />
    </Router>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from './hooks/useTheme'
import { getPublicBase } from './lib/publicBase'
import './index.css'

// See public/404.html: a deep-link reload (e.g. /courses on a fresh
// load) gets redirected here by GitHub Pages with the real path encoded
// in a query string. Restore it before the router reads the URL.
;(function restoreDeepLink() {
  const params = new URLSearchParams(window.location.search)
  const redirect = params.get('msd_redirect')
  if (redirect) {
    const base = window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '')
    window.history.replaceState(null, '', base + redirect)
  }
})()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={getPublicBase()}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

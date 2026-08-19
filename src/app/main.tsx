import '../shared/styles/index.css'
import '@fontsource-variable/manrope/wght.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './components/App/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

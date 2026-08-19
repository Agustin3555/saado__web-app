import './App.css'
import { Router } from '../Router/Router'
import { Background } from '../Background/Background'
import { Toaster } from '../Toaster/Toaster'

export const App = () => (
  <div className="cmp-app">
    <Background />
    <Router />
    <Toaster />
  </div>
)

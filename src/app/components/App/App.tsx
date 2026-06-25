import './App.css'
import { Router } from '../Router/Router'
import { Background } from '../Background/Background'

export const App = () => (
  <div className="cmp-app">
    <Background />
    <Router />
    {/* <Toaster /> */}
  </div>
)

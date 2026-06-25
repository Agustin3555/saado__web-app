import './Admin.css'
import { useState } from 'react'
import { Redirect, Route, Switch } from 'wouter'
import { Aside, Header } from './components'
import { Dashboard } from '@/views/Dashboard/Dashboard'

export const Admin = () => {
  const [asideIsOpen, setAsideIsOpen] = useState(false)

  const handleAsideToggle = () => setAsideIsOpen(prev => !prev)

  const handleClose = () => setAsideIsOpen(false)

  return (
    <div className="cmp-admin">
      <Header {...{ asideIsOpen, handleAsideToggle }} />
      <Aside isOpen={asideIsOpen} {...{ handleClose }} />
      <main>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/documentation">{/* <Documentation /> */}</Route>
          <Route path="/checks">{/* <Checks /> */}</Route>
          <Route>
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </main>
    </div>
  )
}

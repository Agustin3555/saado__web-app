import './Admin.css'
import { useState } from 'react'
import { Redirect, Route, Switch } from 'wouter'
import { Aside, Header } from './components'
import { Dashboard } from '@/views/Dashboard/Dashboard'
import { Documentation } from '@/views/Documentation/Documentation'

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
          <Route path="/dashboard" children={<Dashboard />} />
          <Route path="/documentation" children={<Documentation />} />
          {/* <Route path="/checks" children={ <Checks />} /> */}
          <Route children={<Redirect to="/dashboard" />} />
        </Switch>
      </main>
    </div>
  )
}

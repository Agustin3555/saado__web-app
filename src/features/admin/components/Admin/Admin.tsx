import './Admin.css'
import { useEffect, useState } from 'react'
import { useSocketStore } from '@/infra/ws/useSocket.store'
import { useUsersStore } from '@/features/users/store/useUsers.store'
import { useCompaniesStore } from '@/features/company/store/useCompanies.store'
import { useDocumentsStore } from '@/features/docs/store/useDocuments.store'
import { useOriginsStore } from '@/features/origins/store/useOrigins.store'
import { Redirect, Route, Switch } from 'wouter'
import { Aside, Header } from './components'
import { Dashboard } from '@/views/Dashboard/Dashboard'
import { Procurements } from '@/views/Procurements/Procurements'
import { CheckManager } from '@/views/CheckManager/CheckManager'
import { Loader } from '@/shared/components'

export const Admin = () => {
  const connect = useSocketStore(s => s.connect)
  const disconnect = useSocketStore(s => s.disconnect)
  const users = useUsersStore(s => s.users)
  const companies = useCompaniesStore(s => s.companies)
  const refetchUsers = useUsersStore(s => s.refetchUsers)
  const refetchCompanies = useCompaniesStore(s => s.refetchCompanies)
  const refetchDocuments = useDocumentsStore(s => s.refetchDocuments)
  const refetchOrigins = useOriginsStore(s => s.refetchOrigins)
  const [asideIsOpen, setAsideIsOpen] = useState(false)

  const handleAsideToggle = () => setAsideIsOpen(prev => !prev)

  const handleClose = () => setAsideIsOpen(false)

  useEffect(() => {
    connect()
    refetchUsers()
    refetchCompanies()
    refetchDocuments()
    refetchOrigins()

    return () => {
      disconnect()
    }
  }, [
    connect,
    disconnect,
    refetchCompanies,
    refetchDocuments,
    refetchOrigins,
    refetchUsers,
  ])

  return (
    <div className="cmp-admin">
      {users && companies ? (
        <>
          <Header {...{ asideIsOpen, handleAsideToggle }} />
          <Aside isOpen={asideIsOpen} {...{ handleClose }} />
          <main>
            <Switch>
              <Route path="/panel" children={<Dashboard />} />
              <Route path="/contrataciones" children={<Procurements />} nest />
              <Route path="/controles" children={<CheckManager />} />
              <Route children={<Redirect to="/panel" />} />
            </Switch>
          </main>
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}

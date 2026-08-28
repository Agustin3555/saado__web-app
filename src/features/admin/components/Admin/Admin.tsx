import './Admin.css'
import { useEffect, useState } from 'react'
import { useUsersStore } from '@/features/users/store/useUsers.store'
import { useCompaniesStore } from '@/features/company/store/useCompanies.store'
import { useDocumentsStore } from '@/features/docs/store/useDocuments.store'
import { useOriginsStore } from '@/features/origins/store/useOrigins.store'
import { Redirect, Route, Switch } from 'wouter'
import { Aside, Header } from './components'
import { Dashboard } from '@/views/Dashboard/Dashboard'
import { Documentation } from '@/views/Documentation/Documentation'
import { Loader } from '@/shared/components'

export const Admin = () => {
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
    refetchUsers()
    refetchCompanies()
    refetchDocuments()
    refetchOrigins()
  }, [refetchCompanies, refetchDocuments, refetchOrigins, refetchUsers])

  return (
    <div className="cmp-admin">
      {users && companies ? (
        <>
          <Header {...{ asideIsOpen, handleAsideToggle }} />
          <Aside isOpen={asideIsOpen} {...{ handleClose }} />
          <main>
            <Switch>
              <Route path="/dashboard" children={<Dashboard />} />
              <Route path="/documentation" children={<Documentation />} nest />
              {/* <Route path="/checks" children={ <Checks />} /> */}
              <Route children={<Redirect to="/dashboard" />} />
            </Switch>
          </main>
        </>
      ) : (
        <Loader />
      )}
    </div>
  )
}

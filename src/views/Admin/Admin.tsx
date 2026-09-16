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
import { ProcurementList } from '@/features/procurements/components/ProcurementList/ProcurementList'
import { DocumentList } from '@/features/docs/components/DocumentList/DocumentList'
import { Loader } from '@/shared/components'
import { ControlList } from '@/features/controls/components/ControlList/ControlList'
import { useControlsStore } from '@/features/controls/store/useControls.store'

export const Admin = () => {
  const connect = useSocketStore(s => s.connect)
  const disconnect = useSocketStore(s => s.disconnect)
  const refetchUsers = useUsersStore(s => s.refetchUsers)
  const refetchCompanies = useCompaniesStore(s => s.refetchCompanies)
  const refetchDocuments = useDocumentsStore(s => s.refetchDocuments)
  const refetchOrigins = useOriginsStore(s => s.refetchOrigins)
  const refetchControls = useControlsStore(s => s.refetchControls)
  const [asideIsOpen, setAsideIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleAsideToggle = () => setAsideIsOpen(prev => !prev)

  const handleClose = () => setAsideIsOpen(false)

  useEffect(() => {
    // FIXME: se puede mejorar para evitar errores
    const refetchAll = async () => {
      try {
        await Promise.all([
          refetchUsers(),
          refetchCompanies(),
          refetchDocuments(),
          refetchOrigins(),
          refetchControls(),
        ])
      } finally {
        setIsLoading(false)
      }
    }

    // toast.promise(refetchAll, { loading: 'Cargando' })
    refetchAll()
    connect()

    return disconnect
  }, [
    connect,
    disconnect,
    refetchCompanies,
    refetchDocuments,
    refetchOrigins,
    refetchUsers,
    refetchControls,
  ])

  return (
    <div className="cmp-admin">
      {isLoading ? (
        <Loader size="l" />
      ) : (
        <>
          <Header {...{ asideIsOpen, handleAsideToggle }} />
          <Aside isOpen={asideIsOpen} {...{ handleClose }} />
          <main>
            <Switch>
              <Route path="/panel" children={<Dashboard />} />
              {/* BUG: parado en ".../contrataciones/25", al darle a actualizar, navega a ".../contrataciones" */}
              <Route
                path="/contrataciones"
                children={<ProcurementList />}
                nest
              />
              <Route path="/documentos" children={<DocumentList />} nest />
              <Route path="/controles" children={<ControlList />} />
              <Route children={<Redirect to="/panel" />} />
            </Switch>
          </main>
        </>
      )}
    </div>
  )
}

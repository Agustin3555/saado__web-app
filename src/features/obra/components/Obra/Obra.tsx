import './Obra.css'
import { useEffect } from 'react'
import { useLocation, useParams } from 'wouter'
import { useObrasStore } from '../../store/useObras.store'
import { useSelectedObraStore } from '../../store/useSelectedObra.store'
import { useSelectedContentStore } from '@/features/files/store/useSelectedContent.store'
import { Loader } from '@/shared/components'
import { ContentView, ObraHeader } from './components'
import { FileList } from '@/features/files/components/FileList/FileList'

export const Obra = () => {
  const [, setLocation] = useLocation()
  const { id } = useParams<{ id: string }>()
  const obras = useObrasStore(s => s.obras)
  const selectedObra = useSelectedObraStore(s => s.selectedObra)
  const refetchSelectedObra = useSelectedObraStore(s => s.refetchSelectedObra)
  const reset = useSelectedContentStore(s => s.reset)

  useEffect(() => {
    const numberId = parseInt(id)
    const exist = obras?.some(o => o.id === numberId)

    if (exist) {
      refetchSelectedObra(numberId)
      return
    }

    if (window.history.length > 1) window.history.back()
    else setLocation('/')

    return () => {
      // BUG: no se resetea correctamente
      reset()
    }
  }, [id, obras, refetchSelectedObra, reset, setLocation])

  return (
    <div className="cmp-obra">
      {selectedObra ? (
        <>
          <ObraHeader data={selectedObra} />
          <hr />
          <section>
            <FileList
              data={{ id: selectedObra.id, files: selectedObra.files }}
            />
            <ContentView />
          </section>
        </>
      ) : (
        <Loader size="m" />
      )}
    </div>
  )
}

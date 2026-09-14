import './DocumentList.css'
import { useDocumentsStore } from '@/features/docs/store/useDocuments.store'
import { CollectionRouter } from '@/shared/layouts'
import { Document, DocumentCard } from './components'

export const DocumentList = () => {
  const documents = useDocumentsStore(s => s.documents)

  return (
    <CollectionRouter
      handlingClass="cmp-document-list"
      list={documents?.map((d, i) => (
        <DocumentCard key={d.id} data={d} {...{ i }} />
      ))}
      resource={<Document />}
    />
  )
}

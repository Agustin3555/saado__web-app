import './CheckManager.css'
import { useDocumentsStore } from '@/features/docs/store/useDocuments.store'

export const CheckManager = () => {
  const documents = useDocumentsStore(s => s.documents)!

  return (
    <div className="cmp-check-manager">
      <ul></ul>
    </div>
  )
}

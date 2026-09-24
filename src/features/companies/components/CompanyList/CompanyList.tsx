import './CompanyList.css'
import { useEffect } from 'react'
import { useCompaniesStore } from '../../store/useCompanies.store'
import { CompanyCard, CompanyUpsertButton } from './components'

export const CompanyList = () => {
  const companies = useCompaniesStore(s => s.companies)
  const refetchCompanies = useCompaniesStore(s => s.refetchCompanies)

  useEffect(() => {
    refetchCompanies('LIST')
  }, [refetchCompanies])

  return (
    <div className="cmp-company-list">
      <article className="result">
        <ul>
          <CompanyUpsertButton action="NEW" />
          {companies?.map((c, i) => (
            <CompanyCard key={c.id} data={c} {...{ i }} />
          ))}
        </ul>
      </article>
    </div>
  )
}

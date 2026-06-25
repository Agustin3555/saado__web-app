import './Documentation.css'

const mockData: {
  id: number
  numeroExpediente: string
  nombre: string
  updatedAt: string
}[] = [
  {
    id: 1,
    numeroExpediente: 'E 23-2026-9687-Ae',
    nombre:
      'Refacción y Pintura en anfiteatro Parque 2 de Febrero - Resistencia',
    updatedAt: '2023-10-01',
  },
  {
    id: 2,
    numeroExpediente: 'E 23-2026-9687-Ae',
    nombre:
      'Centro de Abordaje Integral de las violencias de Género y Familiar-Colonia Benítez',
    updatedAt: '2023-10-02',
  },
  {
    id: 3,
    numeroExpediente: 'E 23-2026-9687-Ae',
    nombre:
      'Propuesta de Ampliación y Refacción del Edificio Instituto IPRODICH - Resistencia',
    updatedAt: '2023-10-03',
  },
  {
    id: 4,
    numeroExpediente: 'E 23-2026-9687-Ae',
    nombre:
      'Refacción y Pintura en anfiteatro Parque 2 de Febrero - Resistencia',
    updatedAt: '2023-10-01',
  },
  {
    id: 5,
    numeroExpediente: 'E 23-2026-9687-Ae',
    nombre:
      'Centro de Abordaje Integral de las violencias de Género y Familiar-Colonia Benítez',
    updatedAt: '2023-10-02',
  },
  {
    id: 6,
    numeroExpediente: 'E 23-2026-9687-Ae',
    nombre:
      'Propuesta de Ampliación y Refacción del Edificio Instituto IPRODICH - Resistencia',
    updatedAt: '2023-10-03',
  },
  {
    id: 7,
    numeroExpediente: 'E 23-2026-9687-Ae',
    nombre:
      'Refacción y Pintura en anfiteatro Parque 2 de Febrero - Resistencia',
    updatedAt: '2023-10-01',
  },
  {
    id: 8,
    numeroExpediente: 'E 23-2026-9687-Ae',
    nombre:
      'Centro de Abordaje Integral de las violencias de Género y Familiar-Colonia Benítez',
    updatedAt: '2023-10-02',
  },
  {
    id: 9,
    numeroExpediente: 'E 23-2026-9687-Ae',
    nombre:
      'Propuesta de Ampliación y Refacción del Edificio Instituto IPRODICH - Resistencia',
    updatedAt: '2023-10-03',
  },
]

export const Documentation = () => {
  return (
    <div className="cmp-documentation">
      <article className="result">
        <ul>
          {mockData.map(({ id, numeroExpediente, nombre, updatedAt }) => (
            <li key={id} title={nombre}>
              <h1>{numeroExpediente}</h1>
              <div className="details">
                <p>
                  <span className="title">Obra:</span>
                  <span className="value">{nombre}</span>
                </p>
                <p>
                  <span className="title">Actualizado:</span>
                  <span className="value">{updatedAt}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </div>
  )
}

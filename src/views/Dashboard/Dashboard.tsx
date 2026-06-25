import './Dashboard.css'

export const Dashboard = () => {
  return (
    <div className="cmp-dashboard">
      <div className="hero">
        <div className="desc">
          <h1>Panel de control</h1>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            necessitatibus sequi laudantium, natus temporibus nemo autem rerum
            sit ipsam consequatur adipisci placeat alias ullam culpa.
          </p>
        </div>
        <ul className="counts">
          <li className="count a">
            <h1>
              <span>Aprobados</span>
              <strong className="stroke">42</strong>
            </h1>
          </li>
          <li className="count b">
            <h1>
              <span>Para revisión</span>
              <strong className="stroke">04</strong>
            </h1>
          </li>
          <li className="count c">
            <h1>
              <span>Rechazados</span>
              <strong className="stroke">10</strong>
            </h1>
          </li>
        </ul>
      </div>
      <div className="panels"></div>
    </div>
  )
}

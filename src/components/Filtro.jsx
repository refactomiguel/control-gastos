import { useState, useEffect } from 'react'

const Filtro = ({filtro, setFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className='campo'>
                <label>Filtrar gastos</label>
                <select id="categoria" value={filtro} onChange={ e => setFiltro(e.target.value) }>
                    <option value="">-- Todos --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="hogar">Hogar</option>
                    <option value="varios">Gastos varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filtro

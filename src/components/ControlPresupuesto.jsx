import { formatearMoneda } from '../helpers'
import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({ gastos, presupuesto, setGastos, setPresupuesto, setIsValidPresupuesto }) => {

  const [gastado, setGastado] = useState(0)
  const [porcentaje, setPorcentaje] = useState(0)

  useEffect( () => {
    const gastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0 )
    const nuevoPorcentaje = presupuesto > 0 ? ((presupuesto - (presupuesto - gastado)) / presupuesto * 100) : 0

    setTimeout(() => {
      setPorcentaje(Number(nuevoPorcentaje).toFixed(2))
    }, 500);

    setGastado(gastado)
  }, [gastos])

  const _handleResetApp = () => {
    const res = confirm('¿Estás seguro?')
    if (res) {
      setGastos([])
      setPresupuesto(0)
      setIsValidPresupuesto(false)
    }
  }

  const progressStyles = {
    textColor: `${gastado > presupuesto ? '#DC2626' : '#3B82F6'}`,
    pathColor: `${porcentaje > 100 ? '#DC2626' : '#3B82F6'}`,
    trailColor: '#F5F5F5'
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles(progressStyles)}
          value={porcentaje}
          text={`${porcentaje}% gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={ _handleResetApp } >Resetear App</button>
        <p><span>Presupuesto: </span>{ formatearMoneda(presupuesto)} </p>
        <p className={`${gastado > presupuesto ? 'negativo' : ''}`}><span>Disponible: </span>{ formatearMoneda(presupuesto-gastado)} </p>
        <p><span>Gastado: </span>{ formatearMoneda(gastado)} </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto

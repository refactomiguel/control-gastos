import IcoCerrar from '../img/cerrar.svg'
import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'

const Modal = ({ animarModal, gastoEditar, setAnimarModal, setGastoEditar, setModal, guardarGasto }) => {

  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [mensaje, setMensaje] = useState('')

  useEffect( () => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
    }
  }, [])

  const ocultarModal = () => {
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
      setGastoEditar({})
    }, 500);
  }

  const _handleSubmit = (e) => {
    e.preventDefault()

    if ([nombre, cantidad, categoria].includes('')) {
      setMensaje('Todos los campos son obligatorios')
      setTimeout(() => {
        setMensaje('')
      }, 3000);
      return
    }
    setMensaje('')

    const tmpGasto = {
      nombre,
      cantidad,
      categoria
    }

    if (gastoEditar.id) { //si editando...
      tmpGasto.id = gastoEditar.id
      tmpGasto.fecha = gastoEditar.fecha
    }

    guardarGasto(tmpGasto)
    ocultarModal()
  }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={IcoCerrar} alt="close" onClick={ocultarModal} />
      </div>

      <form className={`formulario ${animarModal ? 'animar' : 'cerrar'}`} onSubmit={_handleSubmit}>

        <legend>{ gastoEditar.id ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

        { mensaje && (
          <Mensaje tipo="error">
            {mensaje}
          </Mensaje>
        )}

        <div className='campo'>
          <label htmlFor='nombre'>Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={ e => setNombre(e.target.value) }
          />
        </div>

        <div className='campo'>
          <label htmlFor='cantidad'>Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade una cantidad"
            value={cantidad}
            onChange={ e => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className='campo'>
          <label htmlFor='categoria'>Categoría</label>
          <select id="categoria" value={categoria} onChange={ e => setCategoria(e.target.value)}>
            <option value="">-- Selecciona --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="hogar">Hogar</option>
            <option value="varios">Gastos varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input type="submit"  value={gastoEditar.id ? 'Guardar' : 'Añadir gasto'} />
      </form>
    </div>

  )
}

export default Modal

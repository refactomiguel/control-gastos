import { useState, useEffect } from 'react'
import { generarId } from './helpers'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Filtro from './components/Filtro'
import Modal from './components/Modal'
import IcoNuevoGasto  from './img/nuevo-gasto.svg'




function App() {

  const [presupuesto, setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState([])
  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  useEffect(() => {
    const savedPresupuesto = Number( localStorage.getItem('presupuesto')  ?? 0 );
    const savegGastos = JSON.parse(localStorage.getItem('gastos')) ?? [];
    if (savedPresupuesto > 0) {
      setPresupuesto(savedPresupuesto)
      setGastos(savegGastos)
      setIsValidPresupuesto(true)
    }
  }, [])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      openModal()
    }
  }, [gastoEditar])


  useEffect( () => {
    if (isValidPresupuesto) {
      localStorage.setItem('presupuesto', presupuesto ?? 0)
    } else {
      localStorage.setItem('presupuesto', 0)
    }
  }, [isValidPresupuesto])

  useEffect( () => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect( () => {
    if (filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    } else {
      setGastosFiltrados([])
    }
  }, [filtro])


  const cargaDatosEjemplo = () => {
    setPresupuesto(2000)
    setGastos(getExampleData())
    setIsValidPresupuesto(true)
  }

  const getExampleData = () => {
    return [
      {
        id: 'g1',
        nombre: 'Mantenimiento jardín',
        cantidad: 150,
        categoria: 'hogar',
        fecha: Date.now()
      },
      {
        id: 'g2',
        nombre: 'Cine',
        cantidad: 20,
        categoria: 'ocio',
        fecha: Date.now()
      },
      {
        id: 'g3',
        nombre: 'Netflix',
        cantidad: 10,
        categoria: 'suscripciones',
        fecha: Date.now()
      },
      {
        id: 'g4',
        nombre: 'Dentista',
        cantidad: 50,
        categoria: 'salud',
        fecha: Date.now()
      },
      {
        id: 'g5',
        nombre: 'Transporte',
        cantidad: 50,
        categoria: 'varios',
        fecha: Date.now()
      },

    ]
  }

  const _handleNuevoGasto = () => {
    openModal()
  }

  const openModal = () => {
    setModal(true)
    setTimeout(() => {
      setAnimarModal(true)
    }, 250);
  }

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      // Editando gasto
      const tmpGastos = gastos.map(item => item.id === gasto.id ? gasto : item)
      setGastos(tmpGastos)
    } else {
      // Añadiendo nuevo gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }

    setGastoEditar({})
  }

  const eliminarGasto = (id) => {
    const tmpGastos = gastos.filter( item => item.id !== id)
    setGastos(tmpGastos)
  }

  return (
    <div className={modal ? 'fijar': ''}>
      <Header
        cargaDatosEjemplo={cargaDatosEjemplo}
        isValidPresupuesto={isValidPresupuesto}
        gastos={gastos}
        presupuesto={presupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setGastos={setGastos}
        setPresupuesto={setPresupuesto}
      />



      { isValidPresupuesto && (
        <>
          <main>
            <Filtro filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos gastos={filtro ? gastosFiltrados : gastos} eliminarGasto={eliminarGasto} setGastoEditar={setGastoEditar}/>
          </main>

          <div className='nuevo-gasto'>
            <img
              src={IcoNuevoGasto}
              alt="Nuevo Gasto"
              onClick={_handleNuevoGasto}
            />
          </div>
        </>

      ) }

      { modal &&
        <Modal
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          setModal={setModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }
    </div>
  )
}

export default App

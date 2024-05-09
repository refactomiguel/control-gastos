import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatearFecha, formatearMoneda } from '../helpers'

import IcoAhorro from '../img/icono_ahorro.svg'
import IcoCasa from '../img/icono_casa.svg'
import IcoComida from '../img/icono_comida.svg'
import IcoGastos from '../img/icono_gastos.svg'
import IcoOcio from '../img/icono_ocio.svg'
import IcoSalud from '../img/icono_salud.svg'
import IcoSuscripciones from '../img/icono_suscripciones.svg'

const icoTipoGasto = {
  ahorro: IcoAhorro,
  comida: IcoComida,
  hogar: IcoCasa,
  varios: IcoGastos,
  ocio: IcoOcio,
  salud: IcoSalud,
  suscripciones: IcoSuscripciones,
}

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {

  const {categoria, nombre, fecha, cantidad, id} = gasto

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar(gasto)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => eliminarGasto(gasto.id) }>
        Borrar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
        <div className="gasto sombra">
            <div className="contenido-gasto">
              <img src={ icoTipoGasto[categoria]} alt={categoria} />
              <div className="descripcion-gasto">
                <p className="categoria">{categoria}</p>
                <p className="nombre-gasto">{nombre}</p>
                <p className="fecha-gasto">Agregado el <span>{ formatearFecha(fecha) }</span></p>
              </div>
            </div>

            <p className="cantidad-gasto">{formatearMoneda(cantidad)}</p>
        </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto

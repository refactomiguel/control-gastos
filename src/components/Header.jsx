import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({cargaDatosEjemplo, gastos, presupuesto, setGastos, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto}) => {
	return (
		<header>
      <h1>Planificador de gastizos</h1>

      { isValidPresupuesto ?
        (
          <ControlPresupuesto
            gastos={gastos}
            presupuesto={presupuesto}
            setGastos={setGastos}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        ) : (
          <NuevoPresupuesto
            cargaDatosEjemplo={cargaDatosEjemplo}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        )
      }



		</header>
	)
}

export default Header

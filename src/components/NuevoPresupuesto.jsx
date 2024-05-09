import { useState } from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto, cargaDatosEjemplo}) => {

	const [mensaje, setMensaje] = useState('')

	const _handlePresupuesto = (e) => {
		e.preventDefault()

		if (!presupuesto || presupuesto < 0) {
			setMensaje('No es un presupuesto válido')
			setIsValidPresupuesto(false)
			return
		}

		setIsValidPresupuesto(true)
		setMensaje('')
	}

	return (
		<div className="contenedor-presupuesto contenedor sombra">
			<form className="formulario" onSubmit={_handlePresupuesto}>
				<div className="campo">
					<label>Definir Presupuesto</label>
					<input
						className="nuevo-presupuesto"
						type="number"
						placeholder="Añade tu presupuesto"
						value={presupuesto}
						onChange={ e => setPresupuesto(Number(e.target.value)) }
					/>
					<input type="submit" value="Añadir" />

					<a href="#" className='datos-ejemplo' onClick={cargaDatosEjemplo}>Cargar datos de ejemplo</a>

					{ mensaje && <Mensaje tipo="error">{mensaje}</Mensaje> }

				</div>
			</form>
		</div>



	)
}

export default NuevoPresupuesto

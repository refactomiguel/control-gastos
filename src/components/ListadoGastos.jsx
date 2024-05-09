import Gasto from "./Gasto"

const ListadoGastos = ({gastos, eliminarGasto, setGastoEditar}) => {
  return (
    <div className="listado-gastos contenedor">
        <h2>{ gastos.length ? 'Gastos' : 'No hay gastos' }</h2>
        <p>{ gastos.length ? 'Desliza el gasto hacia la derecha para editar o a la izquierda para borrar' : '' }</p>
        { gastos.map( gasto => (
            <Gasto key={gasto.id} eliminarGasto={eliminarGasto} gasto={gasto} setGastoEditar={setGastoEditar}/>
        ) ) }
    </div>
  )
}

export default ListadoGastos

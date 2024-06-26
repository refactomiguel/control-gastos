export const generarId = () => {
  const random = Math.random().toString(36).substr(2)
  const fecha = Date.now().toString(36)
  return random + fecha
}

export const formatearFecha = timestamp => {
  const fecha = new Date(timestamp)
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }
  return fecha.toLocaleDateString('es-ES', opciones)
}

export const formatearMoneda = (importe) => {
  return importe.toLocaleString('es-ES', {
    style: 'currency', currency: 'EUR'
  })
}
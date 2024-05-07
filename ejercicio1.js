/*
Entrada:
Aspiradora=45200
Madera Balsa x 100gr =965 (7 de 10)
Jamón cocido xKg = 4750.75 (42 estrellas de 100)
Camisa Azul marca Polo = 9499.9 (4.3/5)
*/

/*
Salida:
Productos: [ 
  { nombre: "Aspiradora", precio: 45200 }, 
  { nombre: "Madera Balsa x 100gr", precio: 965, valoracion: "7 de 10" }
  { nombre: "Jamón cocido xKg", precio: 4750.75, valoracion: "42 estrellas de 100" }
  { nombre: "Camisa Azul marca Polo", precio: 9499.90, valoracion: "4.3/5" }
]'
*/
const fs = require('node:fs');

let obteinParhentesis = new RegExp(/\([^\)]+\)/g)
let obteinPrice = new RegExp(/\$[(0-9.)]+/g)
let obteinCurrency = new RegExp(/(\$|\¥|\us|\£)+/g)

let obteinPriceNotSymbol = new RegExp(/[(0-9.)]+/)
let obteinName = new RegExp(/\([^\)]+\)/g)

function formatInfo(info) {
  let productosName = []
  let productos = []

  let miData = info.split(/\n/)
  miData.forEach(e => {
    if (e.includes('=')){
      let nombre = e.match(/[^\=]+/)[0]
      let parentesis = e.match(obteinParhentesis) ? e.match(obteinParhentesis)[0] : 'No tiene valoracion'
      let precio1 = e.split(/\=/)[1]

      //Esta linea tendria que superar el adicional
      productosName.push(obtenerMarca(nombre))

      productos.push({
        nombre,
        valoracion: parentesis,
        precio: obtenerPrecio(precio1),
        tipoMoneda: obtenerMoneda(precio1)
      })
    }
    if (e.includes(':')) {
      let nombre = e.match(/[^\:]+/)[0]
      let parentesis = e.match(obteinParhentesis) ? e.match(obteinParhentesis)[0] : 'No tiene valoracion'
      let precio1 = e.split(/\:/)[1]

      
      productosName.push(obtenerMarca(nombre))
      productos.push({
        nombre,
        valoracion: parentesis,
        precio: obtenerPrecio(precio1),
        tipoMoneda: obtenerMoneda(precio1)
      })

    }
    if (e.includes('->')) {
      let nombre = e.match(/[^\->]+/)[0]
      let parentesis = e.match(obteinParhentesis) ? e.match(obteinParhentesis)[0] : 'No tiene valoracion'
      let precio1 = e.split(/\->/)[1]

      productosName.push(obtenerMarca(nombre))
      productos.push({
        nombre,
        valoracion: parentesis,
        precio: obtenerPrecio(precio1),
        tipoMoneda: obtenerMoneda(precio1)
      })
    }
  })

  let productosFormateados = {}

  let namesNoRepetidos = [...new Set(productosName)]

  namesNoRepetidos.forEach(name => {
    productosFormateados[name] = []
  })

  productos.forEach(producto => {
    let marca = obtenerMarca(producto.nombre)
    if(producto.nombre.toLowerCase().includes(marca)){
      productosFormateados[marca].push(producto)
    }else{
      productosFormateados[marca].push(producto)
    }
  })

  console.log(productosFormateados)
}

let obtenerMarca = (nombre) => {
  if(nombre.includes('marca')){
    let index = nombre.indexOf('marca')
    let formatNombre = nombre.slice(index+ 5).trim('')

    return formatNombre.toLowerCase()
  }else{
    return 'Sin Marca Especificada'
  }
}

let obtenerMoneda = (data) => {
  return data.match(obteinCurrency) ? data.match(obteinCurrency)[0] : 'No tiene tipo de moneda' 
}

let obtenerPrecio = (data) => {
  if(data.match(obteinPrice)){
    //Esta linea pasa el nivel 2
    return data.match(obteinPrice)[0]
  }else if(data.match(obteinCurrency)){
    return data.match(/(\$|\¥|\us|\£|\€)[0-9].+/) ? data.match(/(\$|\¥|\us|\£|\€)[0-9].+/)[0]: 'nulo'
  }
  else{
    return data.split(obteinParhentesis).toString().trim()
  }
}

fs.readFile('info.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  formatInfo(data)
})


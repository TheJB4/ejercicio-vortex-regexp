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
let obteinPriceNotSymbol = new RegExp(/[(0-9.)]+/)
let obteinName = new RegExp(/\([^\)]+\)/g)

function formatInfo(info) {
  let productos = []
  let miData = info.split(/\n/)

  miData.forEach(e => {
    if (e.includes('=')){
      let nombre = e.split(/\=/)[0]
      console.log(nombre)
    }
    if (e.includes(':')) {
      let nombre = e.split(/\:/)[0]
      console.log(nombre)

    }
    if (e.includes('->')) {
      let nombre = e.split(/\->/)[0]
      console.log(nombre)
    }
  })

}


fs.readFile('info.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  formatInfo(data)
})


function formatInfo(info){
    let productos = []
    let miData = info.split(/\n/)

    let producto = miData.map(data =>{
      if(data.includes('=')) return data.split(/=(.*)[\r\n]*/g)
      if(data.includes(':')) return data.split(/:(.*)[\r\n]*/g)
      if(data.includes('->')) return data.split(/->(.*)[\r\n]*/g)
    })
    
    producto.forEach((e,i)=> {
      //console.log(e[1].split('\('))
      let result = e[1].split('\(')
      //producto[i][1] = result[0]
      //producto[i][2] = result[1]

      producto[i][1] = result[0]
      producto[i][2] = result[1]

    })

    producto.forEach(e => {
      productos.push({
        nombre : e[0],
        precio: e[1],
        puntuacion: e[2]
      })
    })

    console.log(productos)
}

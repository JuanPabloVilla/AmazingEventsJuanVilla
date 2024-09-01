import * as functdata from '../modules/function.js'
functdata.data().then(data => {
  functdata.pintarPagina(data.events)
})

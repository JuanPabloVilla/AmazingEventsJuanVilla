import * as functdata from '../modules/function.js';
functdata.data().then(data => {
  let currentDate = data.currentDate
    let pastevents = data.events.filter(evento => {
        return new Date(evento.date) > new Date(currentDate);
    });
    functdata.pintarPagina(pastevents);
});


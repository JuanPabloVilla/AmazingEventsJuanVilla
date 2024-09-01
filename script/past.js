import * as functdata from '../modules/function.js';
functdata.data().then(data => {
  let currentDate = data.currentDate
    let pastevents = data.events.filter(evento => {
        return new Date(evento.date) < new Date(currentDate);
    });
    functdata.pintarPagina(pastevents);
    console.log(currentDate)
    console.log(pastevents);
    
});

/*
function filtropast(data){
let past_events = []  
let fecha_actual = new Date(data.currentDate)

 for (let evento of data.events) {
    let event_date = new Date(evento.date)
    
    if (event_date < fecha_actual) {
        past_events.push(evento)
    }

 }
return past_events
}
*/
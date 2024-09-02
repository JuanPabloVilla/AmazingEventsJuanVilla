import * as functdata from '../modules/function.js'
functdata.data().then(data => {
    let url = window.location.search
    let url2 = new URLSearchParams(url)
    let variable = data.events.find(evento => evento._id == url2.get("id"))
    console.log(variable)

    let contenedor = document.getElementById("details")
    let tarjeta = document.createElement("div")
    tarjeta.innerHTML =` 
    <div class="card d-flex justify-content-around mt-5 textcardcont" style="width: 40%;">
        <div>
          <img src="${variable.image}" class="card-img-top" alt="outing_to_the_museum">
        </div>
        <div class="card-body d-flex flex-column text-center">
          <p class="card-text">Name: ${variable.name}</p>
          <p> Date: ${variable.date}</p>
          <p>Description:${variable.description}</p>
          <p>Category:${variable.category}</p>
          <p>Place: ${variable.place}</p>
          <p>Capacity: ${variable.capacity}</p>
          <p>Assistance:${variable.assistance}</p>
          <p>Price: ${variable.price}</p>
        </div>
    </div>`
    contenedor.appendChild(tarjeta)
    /*
function Eventos(variable) {
    let container = document.getElementById("details")  
  let fragment = document.createDocumentFragment();
  
  for (let i = 0; i < variable.length; i++) {
    let tarjeta = document.createElement("div")
    tarjeta.className = "card col-sm-5 col-lg-3 col-xl-2 mx-4 p-0"
    tarjeta.innerHTML =function Eventos(variable) {
        let container = document.getElementById("details")
        container.innerHTML = "";
      
        if (variable.length === 0) {
          container.innerHTML = "<p>No hay eventos para mostrar.</p>";
          return;
      }
      
      let fragment = document.createDocumentFragment();
      
      for (let i = 0; i < variable.length; i++) {
        let tarjeta = document.createElement("div")
        tarjeta.className = "card col-sm-5 col-lg-3 col-xl-2 mx-4 p-0"
        tarjeta.innerHTML =` 
                <div class="card d-flex justify-content-around mt-5 textcardcont" style="width: 40%;">
                    <div>
                      <img src="../assets/outing_to_the_museum.jpg" class="card-img-top" alt="outing_to_the_museum">
                    </div>
                    <div class="card-body d-flex flex-column text-center">
                      <p class="card-text">Name: ${variable[i].name}</p>
                      <p> Date: ${variable[i].date}</p>
                      <p>Description:${variable[i].description}</p>
                      <p>Category:${variable[i].category}</p>
                      <p>Place: ${variable[i].place}</p>
                      <p>Capacity: ${variable[i].capacity}</p>
                      <p>Assistance:${variable[i].assistance}</p>
                      <p>Price: ${variable[i].price}</p>
                    </div>
                </div>`
          fragment.appendChild(tarjeta)                
      }
        container.appendChild(fragment);
      }
      fragment.appendChild(tarjeta)                
  }
    container.appendChild(fragment);
  }
    
  Eventos(variable);
  */
})  
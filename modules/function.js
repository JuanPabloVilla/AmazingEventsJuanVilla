
export function data(){
    return fetch('https://aulamindhub.github.io/amazing-api/events.json').then(response => response.json())
}

export function pintarPagina(variable){

let searchbutons = document.getElementById("SearchBar")

function Eventos(variable) {
    let container = document.getElementById("container")
    container.innerHTML = "";
  
    if (variable.length === 0) {
      container.innerHTML = "<p>No hay eventos para mostrar.</p>";
      return;
  }
  
  let fragment = document.createDocumentFragment();
  
  for (let i = 0; i < variable.length; i++) {
    let tarjeta = document.createElement("div")
    tarjeta.className = "card col-sm-5 col-lg-3 col-xl-2 mx-4 p-0"
    tarjeta.innerHTML = `
                <img src="${variable[i].image}" class="card-img-top" alt="food_fair">
                <div class="textcardcont card-body d-flex flex-column">  
                  <h5 class="card-title">${variable[i].name}</h5>
                  <p class="card-text">${variable[i].description}</p>
                  <div class="cartcont align-items-center d-flex flex-row justify-content-around mt-auto">
                    <span class="fw-bold">precio: ${variable[i].price}</span>
                    <a href="./pages/details.html" class="btn btnclr">details</a>
                  </div>
               </div>` 
      fragment.appendChild(tarjeta)                
  }
    container.appendChild(fragment);
  }

///////////////

  function filtrarEventos() {
    let texto = document.getElementById("texto").value.toLowerCase();
    let checkboxes = document.querySelectorAll("#SearchBar input[type='checkbox']:checked");
    let categoriasSeleccionadas = Array.from(checkboxes).map(checkbox => checkbox.value);
  
    let eventosFiltrados = variable.filter(evento => {
        let coincideTexto = evento.name.toLowerCase().includes(texto) || evento.description.toLowerCase().includes(texto);
        let coincideCategoria = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(evento.category);
        return coincideTexto && coincideCategoria;
    });
  
    Eventos(eventosFiltrados);
  }
  
  document.getElementById("texto").addEventListener("input", filtrarEventos);
  
  document.querySelectorAll("#SearchBar input[type='checkbox']").forEach(checkbox => {
      checkbox.addEventListener("change", filtrarEventos);
  });
  
  Eventos(variable);

//////////

  let categorias = new Set()

  variable.forEach(evento => {
    categorias.add(evento.category);
  });
  
  let categoriasArray = Array.from(categorias);
  
  for (let i = 0; i < categoriasArray.length; i++) {
    let label = document.createElement("label")
        label.innerHTML = `
                    <input type="checkbox" value="${categoriasArray[i]}" id= "${categoriasArray[i]}"> ${categoriasArray[i]}
    `
    searchbutons.appendChild(label)                
  }
    
}

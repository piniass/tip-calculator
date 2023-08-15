const inputDinero = document.getElementById("number")
const inputPersonas = document.getElementById("people")
const inputPropinaCustom = document.getElementById("propina-custom");
let dinero = 0;
let descuento = 0;
let amount = 0;
let personas = 1;
let total = 0;
let cantidadCabeza = 1;

// EXTRAER Y PARSEAR EL INPUT DE DINERO 
function extraerDinero(callback) {
    inputDinero.addEventListener('input', function() {
    dinero = parseFloat(inputDinero.value); 
    // console.log(dinero)
    });
    callback();
}


// EXTRAER Y PARSEAR EL BOTON
function extraerBoton(callback){
    const parentNodes = document.getElementsByClassName("tips"); // Obtener todos los nodos con la clase "tips"

    // Iterar a través de los nodos con la clase "tips"
    for (const parentNode of parentNodes) {
      const childElements = parentNode.children;
    
      // Iterar a través de los elementos hijos de cada nodo
      for (const childElement of childElements) {
        if(childElement.tagName === 'INPUT' && childElement.type === 'button'){
          childElement.addEventListener('click', function() {
            const valor = childElement.value;
            const valorStr = valor.substring(0,valor.length - 1)
            const valorParseado = parseFloat(valorStr);
            descuento = valorParseado;
            callback();
          });
        } else {
            inputPropinaCustom.addEventListener('input', function() {
            let propinaCustom = parseFloat(inputPropinaCustom.value);
            descuento = propinaCustom;
            callback();
            });
        }
        
      }
    }
}

// EXTRAER Y PARSEAR LAS PERSONAS 
const zero = document.getElementById("zero");

function extraerPersonas(callback) {
  inputPersonas.addEventListener('input', function() {
      personas = parseFloat(inputPersonas.value);
      if(personas != 0){
        zero.style.display = "none";
        callback(); // Llamar al siguiente paso
      } else {
        zero.style.display = "block";
        cantidad.innerHTML = "0.00";
        totalPersonas.innerHTML = "0.00";
      }
  });
}
const cantidad = document.getElementById("amount");
const totalPersonas = document.getElementById("amount-total");

// CALCULAR EL DINERO POR CABEZA 
function dineroCabeza(callback) {
  cantidadCabeza = dinero/personas*(descuento/100);
  // cantidadCabeza = dinero - (dinero * (descuento / 100));
  cantidad.innerHTML = cantidadCabeza.toFixed(2);
  console.log("El dinero es " + dinero);
  console.log("El descuento es " + descuento);
  console.log("Las personas son " + personas);
  console.log(typeof cantidadCabeza)
  console.log(typeof personas)
  console.log("Prueba: " + (cantidadCabeza*personas))
  total = (dinero/personas+cantidadCabeza).toFixed(2);
  console.log("el total es "+total)
  totalPersonas.innerHTML = total;
}


// Llamada a las funciones en orden
extraerDinero(function () {
  extraerBoton(function () {
      extraerPersonas(function () {
          dineroCabeza(); // Pasar dineroTotal como callback
      });
  });
});

//Reset
function resetear(){
  const reset = document.getElementById('reset');
  reset.addEventListener('click', function(){
    cantidad.innerHTML = "0.00";
    totalPersonas.innerHTML = "0.00";
    inputDinero.value = "";
    inputPersonas.value = "";
    inputPropinaCustom.value = "";
    zero.style.display = "none";

  });
}

resetear();
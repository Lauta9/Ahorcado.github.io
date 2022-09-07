var contenedorLetras = document.querySelector(".contenedor-letras-bien");
var contenedorLetrasMal = document.querySelector(".contenedor-letras-mal");
let botonEmpezar = document.querySelector(".btn-njuego")
var listaTeclas = document.querySelectorAll(".key");
var teclado = document.querySelector(".teclado");
var tecladoPantalla = document.querySelector(".teclado-pantalla");
let botonRendirse = document.querySelector(".btn-rendirse")

botonEmpezar.onclick = empezar
botonRendirse.onclick = rendirse

var letraActual = "";
var palabraActual = "";
var letrasErradas = "";
var contadorLetrasCorrectas = 0;
var repetidas = [];

teclado.onclick = null;


function generarNumeroAleatorio(maximo){
    var numero = Math.floor(Math.random()*maximo - 0);
    return numero;
}


function crearBloqueLleno(palabra){
    limpiarBloque();
    for(var i = 0 ; i < palabra.length; i++){
        var elemento = document.createElement("div");
        elemento.classList.add("letra-bien");
        elemento.textContent = palabra[i]
        contenedorLetras.appendChild(elemento);
    }
}

function resetearValores(){
    contadorLetrasCorrectas = 0;
    letrasErradas = "";
    limpiarLetrasMal();
    repetidas = [];
}

function crearBloqueVacio(palabra){
    limpiarBloque();
    for(var i = 0 ; i < palabra.length; i++){
        var elemento = document.createElement("div");
        elemento.classList.add("letra-bien");
        contenedorLetras.appendChild(elemento);
    }
}

function validarLetras(letra){
    if(letra.keyCode >=65 && letra.keyCode <= 90){
        return letra.key.toUpperCase();
    }else{
        return "";
    }
}


function activarTeclas(){
    window.addEventListener("keydown",activarTeclado)
}

function activarTeclado(event){
    letraActual = validarLetras(event);
    completarBloque(letraActual);
    validarDerrota();
    validarVictoria();
}

function activarTecladoPantalla(letra){
    letraActual = letra;
    completarBloque(letraActual);
    validarDerrota();
    validarVictoria();
}



function completarBloque(letra){
    var contenedorLetras = document.querySelector(".contenedor-letras-bien");
    var lista = contenedorLetras.childNodes;
    var i = 0;
    var letraEncontrada = false;
    
    if(!letrasErradas.includes(letra) && !repetidas.includes(letra)){
        for(var elemento of lista){
            if(letra == palabraActual[i]){
                elemento.textContent = letra;
                elemento.classList.add("bordeVerde");
                letraEncontrada = true;
                contadorLetrasCorrectas++;
                repetidas.push(letra);
            }
            i++;
        }
        if(!letrasErradas.includes(letra) && letraEncontrada == false){
            letrasErradas += letra;
            completarLetrasMal(letra);
            crearAhorcado();
        }
    }
}

function limpiarBloque(){
    contenedorLetras.textContent = []
}

function completarLetrasMal(letra){
    var letraMal = document.createElement("div");
    letraMal.textContent = letra;
    letraMal.classList.add("letras-mal");
    contenedorLetrasMal.appendChild(letraMal);
}

function limpiarLetrasMal(){
    contenedorLetrasMal.textContent = "";
}

function validarDerrota(){
    if(letrasErradas.length >= 9){
        Swal.fire(
            'Lo lamento',
            'la palabra era ' + palabraActual,
            'error'
            ,resetearCanvas(),
            resetearValores(),
            reroll()
          )
    }
}

function reroll(){
    var aleatorio = generarNumeroAleatorio(listaPalabras.length);
    palabraActual = listaPalabras[aleatorio]
    crearBloqueVacio(listaPalabras[aleatorio]);
}

function empezar(){
    habilitarTeclas()
    resetearValores();
    teclado.onclick = mostrarTeclado;
    activarTeclas();
    var aleatorio = generarNumeroAleatorio(listaPalabras.length);
    palabraActual = listaPalabras[aleatorio]
    crearBloqueVacio(listaPalabras[aleatorio]);
    resetearCanvas();
}

function rendirse(){
    Swal.fire({
        title: 'Estas seguro que quieres rendirte?',
        text: "Si te rindes tendras que empezar de nuevo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No, Seguir jugando',
        confirmButtonText: 'Si, quiero rendirme'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Lo lamento',
            'la palabra era ' + palabraActual,
            'error'
            ,resetearCanvas(),
            resetearValores(),
            reroll()
          )
          
        }
      })
}


function anularTeclado(){
    window.removeEventListener("keydown",activarTeclado);
}

function validarVictoria(){
    if(contadorLetrasCorrectas >= palabraActual.length){
        Swal.fire({
            title: 'Felicidades Acertaste la palabra era ' + palabraActual,
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
            backdrop: `
              url("https://acegif.com/wp-content/uploads/gif/confetti-8.gif")
              rgba(0,0,123,0.4)
              
            `
          })
        anularTeclado();
        anularTecladoPantalla();
    }
}

function mostrarTeclado(){
    teclado.classList.add("ocultar");
    tecladoPantalla.classList.remove("ocultar");
}

function ocultarTeclado(){
    teclado.classList.remove("ocultar");
    tecladoPantalla.classList.add("ocultar");
    teclado.onclick = null;
}

function anularTecladoPantalla(){
    for(var tecla of listaTeclas){
        tecla.removeEventListener("click",habilitarTeclado)
    }
}

function habilitarTeclas(){
    for(var tecla of listaTeclas){
        tecla.addEventListener("click",habilitarTeclado);
    }
}

function habilitarTeclado(){
    activarTecladoPantalla(this.textContent);
 }

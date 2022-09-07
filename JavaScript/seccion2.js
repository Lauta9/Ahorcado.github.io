var seccion1 = document.querySelector(".seccion1")
var seccion2 = document.querySelector(".seccion2");
var seccion3 = document.querySelector(".seccion3");
let botonNuevo = document.querySelector(".btn-iniciar")
let botonNueva = document.querySelector(".btn-nueva")
let botonGuardar = document.querySelector(".boton-guardar")


botonNuevo.onclick = juegoDirecto;
botonNueva.onclick = botonesFuera;
botonGuardar.onclick = validar;


var listaLetras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N",
                   "Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z",];

    function botonesFuera(){
         seccion1.classList.add("ocultar")
         seccion2.classList.remove("ocultar")
        }
                
    function cambiarSecciones(){
         seccion2.classList.add("ocultar")
         seccion3.classList.remove("ocultar");
        }
                
    function juegoDirecto(){
    seccion1.classList.add("ocultar")
    seccion3.classList.remove("ocultar")
    }              


    function limpiarTexto(){
        var entrada = document.querySelector(".palabra");
        entrada.value = "";
    }


    function validar(){
        var entrada = document.querySelector(".palabra");
        if(entrada.value.length == 0){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Un momento! Debes ingresar letras(A-Z) Sin espacios, acentos o caracteres especiales',
                showConfirmButton: true,
              })
            return;
        }
    
        for(var i = 0; i < entrada.value.length; i++){
            if(!listaLetras.includes(entrada.value.toUpperCase()[i])){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Un momento! Debes ingresar letras(A-Z), No numeros',
                    showConfirmButton: true,
                  })
                limpiarTexto()
                return;
            }
        } 

        if(entrada.value.length  >= 9){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Un momento! El maximo permitido es 8 letras',
                showConfirmButton: true,
              })
            limpiarTexto()
            return;
        }

    
        if(!listaPalabras.includes(entrada.value.toUpperCase())){
            agregarPalabranueva(entrada.value.toUpperCase());
            Swal.fire({
                title: 'Quieres jugar Ya? o Seguir agregando palabras',
                text: "Puedes agregar la cantidad de palabras que desees",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No, Seguir agregando palabras',
                confirmButtonText: 'Si, quiero jugar Ya'
              }).then((result) => {
                if (result.isConfirmed) {
                    

                  Swal.fire(
                    cambiarSecciones(),
                  )
                }

              })
              limpiarTexto()
        }
    }            

    
    


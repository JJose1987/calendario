/* JavaScript */
/* https://www.degraeve.com/reference/urlencoding.php */
// Variables
const __Objeto = new Objeto();

// Funciones
function main() {
    //Si es telefono girar la vista y las imagenes
    this.__Objeto = new Objeto();
    this.__Objeto.sets();

    $('#image-00').change(function(e) {setColors(e, 0)});

    update();
}

// Asignar valor del campo
function set(object) {
    var index = $(object).attr('name');
    this.__Objeto.set(index, $(object).val());

    update();
}

// Actualizar valores de la clase
function update() {

}

// Asignar el valor a los colores
function setColors(e, i) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var img = new Image();
        img.onload = function() {
            var colorThief = new ColorThief();

            alert(colorThief.getPalette(img, 5));
        };
        
        img.src = event.target.result;
    };
    
    reader.readAsDataURL(file);
}


/* JavaScript */
/* https://www.degraeve.com/reference/urlencoding.php */
// Variables
var kwargs = {};

// Crear un lienzo
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 595;
canvas.height = 842;

const __Objeto = new Objeto();

// Funciones
function main() {
    //Si es telefono girar la vista y las imagenes
    
    $('input[name=year]').val(++y);

    $('input[name=year]').change(function(e) {update()});
    $('#image-00').change(function(e) {setColors(e, parseInt((this.id).substr(6,9)))});
    
    // Solo permitir descargar si tiene una imagen cargada
    $('#d-00').click(function(e) {download(parseInt((this.id).substr(3,6)))});

    update();
}

// Actualizar valores de la clase
function update() {
    for (var i = 0; i <= 12; i++) {
        if (typeof kwargs[i] == 'undefined') {
            kwargs[i] = {'colors': []};
        }
    }

    kwargs['year'] = $('input[name=year]').val();
    
}

// Asignar el valor a los colores
function setColors(e, i) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var img = new Image();
        img.onload = function() {
            //(new ColorThief()).getPalette(img, 5)

            // Dibujar la imagen que vamos a utilizar

            ctx.drawImage(img, 0, 0, img.width, img.height);
        };
        
        img.src = event.target.result;
    };
    
    reader.readAsDataURL(file);
}

// Descargar la imagen
function download(i) {
    // Convertir el lienzo a una imagen base64
    var dataURL = canvas.toDataURL('image/png');
    
    // Crear un enlace para descargar la imagen
    var downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = i + '.png';
    if (i == 0) {
        downloadLink.download =  '00_Portada.png';
    }

    // Agregar el enlace al contenedor en la página
    $('#canvasContainer').append(downloadLink);

    // Simular el clic en el enlace para iniciar la descarga
    downloadLink.click();
}
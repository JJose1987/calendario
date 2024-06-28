/* JavaScript */
/* https://www.degraeve.com/reference/urlencoding.php */
// Variables
var kwargs = {};

// Crear un lienzo
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 595;
canvas.height = 842;


//https://programadorwebvalencia.com/Javascript-nombre-del-mes-en-castellano/

const __Objeto = new Objeto();

// Funciones
function main() {
    //Si es telefono girar la vista y las imagenes

    // Valores base
    $('[name=year]').val(++y);
    
    // Dibujar algo en el lienzo (por ejemplo, un rectángulo rojo)
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    $('[name=year]').change(function(e) {update()});
    $('#image-00, #image-01').change(function(e) {setColors(e, parseInt((this.id).substr(6,9)))});

    // Solo permitir descargar si tiene una imagen cargada
    $('#d-00, #d-01').click(function(e) {download(parseInt((this.id).substr(3,6)))});
    
    // Posicion del texto de la portada
    $('[name=position]').change(function(e) {update()});

    update();
}

// Actualizar valores de la clase
function update() {
    for (var i = 0; i <= 12; i++) {
        if (typeof kwargs[i] == 'undefined') {
            kwargs[i] = {'colors': []};
        }
    }

    kwargs['year']     = $('[name=year]').val();
    kwargs['position'] = $('[name=position]').val();
}

// Asignar el valor a los colores
function setColors(e, i) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var img = new Image();
        img.onload = function() {
            // Extraer colores
            var colors = (new ColorThief()).getPalette(img, 6);
            
            for (var j = 0; j < 6; j++) {
                kwargs[i]['colors'][j] = '#' + ('0' + parseInt(colors[j][0]).toString(16)).slice(-2)
                    + ('0' + parseInt(colors[j][1]).toString(16)).slice(-2)
                    + ('0' + parseInt(colors[j][2]).toString(16)).slice(-2);
            }
            // Dibujar
            var w = canvas.width;
            var h = canvas.height;

            if (i == 0) {
                // Dibujar la portada
                if (w <= img.width) {
                    w = img.width;
                }

                if (h <= img.height) {
                    h = img.height;
                }

                ctx.drawImage(img, ((canvas.width - w) / 2), ((canvas.height - h) / 2), w, h);
                
                msg = 'Calendario ' + kwargs['year'];
                ctx.font = (h / 12) + 'px monospace';
                ctx.fillStyle = kwargs[i]['colors'][0];
                if (kwargs['position'] == 'u') {
                    ctx.fillText(msg, 10, (h / 12));
                } else if (kwargs['position'] == 'm') {
                    console.log('medio');
                    ctx.fillText(msg, 10, (h / 2) + (h / 12));
                } else if (kwargs['position'] == 'b') {
                    ctx.fillText(msg, 10, h - (h / 12));
                }
                
                // Bordes por toda la foto con un fill [https://www.w3schools.com/jsref/canvas_fill.asp] y nombre 'Calendario + año' (esto va abajo) [https://www.w3schools.com/graphics/canvas_text.asp]
            } else {
                // Dibujar imagen
                if (w <= img.width) {
                    w = img.width;
                }

                if (h <= img.height) {
                    h = img.height;
                }

                console.log(-1 * ((canvas.width - w) / 2) + ', ' + ((canvas.height - h) / 2) + ', ' + w / 2 + ', ' + h / 2);

                ctx.drawImage(img, -1 * ((canvas.width - w) / 2), ((canvas.height - h) / 2), w / 2, h / 2);
                
            }
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
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
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    $('[name=year]').change(function(e) {update()});
    $('#image-00, #image-01').change(function(e) {setColors(e, parseInt((this.id).substr(6,9)))});

    // Solo permitir descargar si tiene una imagen cargada
    $("[class='btn fa fa-download']").click(function(e) {download(parseInt((this.id).substr(3,6)))});

    // Posicion del texto de la portada
    $('[name=position]').change(function(e) {update()});

    update();
}

// Actualizar valores de la clase
function update() {
    for (var i = 0; i <= 12; i++) {
        if (typeof kwargs[i] == 'undefined') {
            kwargs[i] = {'colors': []};

            for (var j = 0; j < 9; j++) {
                kwargs[i]['colors'][j] = '#' + ('0' + parseInt(Math.random() * 255).toString(16)).slice(-2)
                    + ('0' + parseInt(Math.random() * 255).toString(16)).slice(-2)
                    + ('0' + parseInt(Math.random() * 255).toString(16)).slice(-2);
            }
        }
    }

    kwargs['year']     = $('[name=year]').val();
    kwargs['position'] = $('[name=position]').val();
}

// Asignar el valor a los colores
function setColors(e, i) {
    var file = e.target.files[0];
    var reader = new FileReader();
    
    for (var j = 0; j < 9; j++) {
        kwargs[i]['colors'][j] = '#' + ('0' + parseInt(Math.random() * 255).toString(16)).slice(-2)
            + ('0' + parseInt(Math.random() * 255).toString(16)).slice(-2)
            + ('0' + parseInt(Math.random() * 255).toString(16)).slice(-2);
            
            rgbToHex
    }

    reader.onload = function(event) {
        var img = new Image();
        img.onload = function() {
            // Extraer colores
            var colors = (new ColorThief()).getPalette(img, 9);

            for (var j = 0; j < colors.length; j++) {
                kwargs[i]['colors'][j] = rgbToHex(colors[j][0], colors[j][1], colors[j][2]);
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
                ctx.fillStyle = calculateTints(kwargs[i]['colors'][8], 11)[10];

                if (kwargs['position'] == 'u') {
                    ctx.fillText(msg, 10, (h / 12));
                } else if (kwargs['position'] == 'm') {
                    ctx.fillText(msg, 10, (h / 2) + (h / 12));
                } else if (kwargs['position'] == 'b') {
                    ctx.fillText(msg, 10, h - (h / 12));
                }
            } else {
                aux_month = i - 1;

                // 595 x 421
                h = canvas.height / 2;
                ctx.drawImage(img, 0, 0, canvas.width, h);

                ctx.rect(0, h, canvas.width, canvas.height);
                ctx.fillStyle = kwargs[i]['colors'][0];
                ctx.fill();

                var tb_msg = [];
                tb_msg[0] = ['  ', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

                ant_NumberWeek = new Date(kwargs['year'], aux_month, 1).iso8601Week();
                tb_msg[1] = [];
                tb_msg[1][0] = ('0' + parseInt(ant_NumberWeek).toString()).slice(-2);

                for (var x = 1; x < new Date(kwargs['year'], aux_month, 1).getDay(); x++) {
                    tb_msg[1][x] = '  ';
                }

                for (var j = 1; j <= new Date(kwargs['year'], aux_month, 0).getDate(); j++) {
                    act_NumberWeek = new Date(kwargs['year'], aux_month, j).iso8601Week();

                    if (act_NumberWeek != ant_NumberWeek) {
                        x = 0;
                        ant_NumberWeek = act_NumberWeek;

                        tb_msg[ant_NumberWeek] = [];
                        tb_msg[ant_NumberWeek][x++] = ('0' + parseInt(ant_NumberWeek).toString()).slice(-2);
                    }

                    tb_msg[ant_NumberWeek][x++] = ('0' + parseInt(j).toString()).slice(-2);
                }

                w = canvas.width;
                h = canvas.height;

                for (var y = 0; y < tb_msg.length; y++) {
                    for (var x = 0; x < (tb_msg[y]).length; x++) {
                        ctx.font = (w / 14) + 'px monospace';
                        ctx.fillStyle = calculateTints(kwargs[i]['colors'][8], 11)[5];
                        if (x == 0 || y == 0) {
                            ctx.fillStyle = calculateTints(kwargs[i]['colors'][8], 11)[10];
                        }

                        ctx.fillText(tb_msg[y][x], (x * (w / 8)) + 10, ((y + 1) * (h / 15)) + (h / 2));
                    }
                }
                
                ctx.font = (w / 14) + 'px monospace';
                ctx.fillStyle = calculateTints(kwargs[i]['colors'][8], 11)[10];

                msg = new Intl.DateTimeFormat(userLanguage, { month: 'long'}).format(new Date(kwargs['year'], aux_month)) + ' ' + kwargs['year'];
                ctx.fillText(msg.capitalize(), 10, ((y + 1) * (h / 15)) + (h / 2));
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
    downloadLink.download = kwargs['year'] + ('0' + parseInt(i).toString()).slice(-2) + '.png';

    // Agregar el enlace al contenedor en la página
    $('#canvasContainer').append(downloadLink);

    // Simular el clic en el enlace para iniciar la descarga
    downloadLink.click();
}

// Calcular Tints de un color dado
function calculateTints(color, steps) {
    const rgb = hexToRgb(color);
    const tints = [];
    for (let i = 1; i <= steps; i++) {
        const factor = i / (steps + 1);
        const r = Math.round(rgb.r + (255 - rgb.r) * factor);
        const g = Math.round(rgb.g + (255 - rgb.g) * factor);
        const b = Math.round(rgb.b + (255 - rgb.b) * factor);
        tints.push(rgbToHex(r, g, b));
    }
    return tints;
}
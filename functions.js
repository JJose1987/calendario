/* JavaScript */
/* https://www.degraeve.com/reference/urlencoding.php */
// Variables
let kwargs = {};
let cps    = [];
let img    = new Image();

// Crear un lienzo
var canvas = document.createElement('canvas');

//https://programadorwebvalencia.com/Javascript-nombre-del-mes-en-castellano/

const __Objeto = new Objeto();

// Funciones
function main() {
    // Valores base
    $('[name=year]').val(++y);

    // CP de la web en España
    cps[1]  = 'Alava';
    cps[2]  = 'Albacete';
    cps[3]  = 'Alicante';
    cps[4]  = 'Almeria';
    cps[5]  = 'Avila';
    cps[7]  = 'Illes Balears';
    cps[6]  = 'Badajoz';
    cps[8]  = 'Barcelona';
    cps[9]  = 'Burgos';
    cps[10] = 'Caceres';
    cps[11] = 'Cadiz';
    cps[12] = 'Castellon';
    cps[13] = 'Ciudad Real';
    cps[14] = 'Cordoba';
    cps[15] = 'A Coruna';
    cps[16] = 'Cuenca';
    cps[17] = 'Girona';
    cps[18] = 'Granada';
    cps[19] = 'Guadalajara';
    cps[20] = 'Gipuzkoa';
    cps[21] = 'Huelva';
    cps[22] = 'Huesca';
    cps[23] = 'Jaen';
    cps[24] = 'Leon';
    cps[25] = 'Lleida';
    cps[26] = 'La Rioja';
    cps[27] = 'Lugo';
    cps[28] = 'Madrid';
    cps[29] = 'Malaga';
    cps[30] = 'Murcia';
    cps[31] = 'Navarra';
    cps[32] = 'Ourense';
    cps[33] = 'Asturias';
    cps[34] = 'Palencia';
    cps[35] = 'Las Palmas';
    cps[36] = 'Pontevedra';
    cps[37] = 'Salamanca';
    cps[38] = 'Santa Cruz de Tenerife';
    cps[39] = 'Cantabria';
    cps[40] = 'Segovia';
    cps[41] = 'Sevilla';
    cps[42] = 'Soria';
    cps[43] = 'Tarragona';
    cps[44] = 'Teruel';
    cps[45] = 'Toledo';
    cps[46] = 'Valencia';
    cps[47] = 'Valladolid';
    cps[48] = 'Bizkaia';
    cps[49] = 'Zamora';
    cps[50] = 'Zaragoza';
    cps[52] = 'Melilla';
    cps[51] = 'Ceuta';

    $.each(cps, function (i, item) {
        $('[name=city]').append($('<option>', {
            value: i,
            text : item
        }));
    });

    // Selector de descarga
    $('[name=dmonth]').append($('<option>', {value: 0, text : 'Portada'}));

    for (var i = 1; i <= 12; i++) {
        var name_month = new Intl.DateTimeFormat(userLanguage, { month: 'long'}).format(new Date(y, i - 1));

        $('[name=dmonth]').append($('<option>', {
            value: i,
            text : name_month.capitalize()
        }));
    }

    $('#image').click(function(e) {
        $('[name=uimage]').click();
    });

    $('[name=year], [name=city], [name=dmonth], [name=background], [name=position]')
        .change(function(e) {update()});
    $('#dimage').click(function(e) {download()});

    $('[name=uimage]').change(function(e) {
        var reader = new FileReader();

        try {
            var file   = e.target.files[0];

            if (file) {
                reader.onload = function(event) {
                    img.onload = function() {
                        kwargs['img'] = img;
                        $('[name=background]').val(rgbToHex((new ColorThief()).getColor(img)));
                        update();
                    }
                    img.src = event.target.result;
                }

                reader.readAsDataURL(file);
            }
        } catch (err) {
            console.log(err.massage);
        }
    });

    update();
}

// Actualizar valores de la clase
function update() {
    if ($('[name=year]').val() > 9999) {
        $('[name=year]').val(9999);
    }

    kwargs['year']     = $('[name=year]').val();
    kwargs['position'] = $('[name=position]').val();
    kwargs['city']     = $('[name=city]').val();
    kwargs['dmonth']   = $('[name=dmonth]').val();
    kwargs['color']    = $('[name=background]').val();

    var pcanvas = document.getElementById('prev');
    draw(pcanvas);
}

// Invertir un color dado
function InversoColor(hex) {
    return rgbToHex((255 - hexToRgb(hex)['r']), (255 - hexToRgb(hex)['g']), (255 - hexToRgb(hex)['b']));
}

// Descargar la imagen
function download() {
    // Introducir los para generar la imagen
    draw(canvas);
    // Convertir el lienzo a una imagen base64
    var dataURL = canvas.toDataURL('image/png');

    // Crear un enlace para descargar la imagen
    var downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = kwargs['year'] + ('0' + parseInt(kwargs['dmonth']).toString()).slice(-2) + '.png';

    // Agregar el enlace al contenedor en la página
    $('#canvasContainer').append(downloadLink);

    // Simular el click en el enlace para iniciar la descarga
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

// Calcular festivos del pasado por parametro
function partyDays() {
    var tb_days = [[0, 1], [0, 6], [4, 1], [7, 15], [9, 12],  [10, 1], [11, 25], [11, 6], [11, 8]];

    tb_days[tb_days.length] = holyWeek();

    var v0 = tb_days[tb_days.length - 1];
    var v1 = [0, 0];

    tb_days[tb_days.length] = holyWeek(-2);

    if (kwargs['city'] == 20) {  /* Gipuzkoa */
        tb_days[tb_days.length] = [0, 20];
        tb_days[tb_days.length] = [2, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [8, 9];
    } else if (kwargs['city'] == 15) {  /* A Coruña */
        tb_days[tb_days.length] = [1, 16];
        tb_days[tb_days.length] = [2, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 17];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [7, 24];
    } else if (kwargs['city'] == 2) {  /* Albacete */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 31];
        tb_days[tb_days.length] = [5, 3];
        tb_days[tb_days.length] = [5, 24];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [8, 8];
    } else if (kwargs['city'] == 3) {  /* Alicante */
        tb_days[tb_days.length] = [2, 19];
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = holyWeek(11);
        tb_days[tb_days.length] = [5, 24];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [9, 9];
    } else if (kwargs['city'] == 4) {  /* Almería */
        tb_days[tb_days.length] = [2, 1];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [5, 24];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [7, 16];
        tb_days[tb_days.length] = addDays([7, 1], 22, 5);
    } else if (kwargs['city'] == 1) {  /* Araba/Álava */
        tb_days[tb_days.length] = [2, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = [3, 28];
        tb_days[tb_days.length] = [6, 25];
        tb_days[tb_days.length] = [7, 5];
        tb_days[tb_days.length] = [7, 15];
    } else if (kwargs['city'] == 33) {  /* Asturias */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [7, 16];
        tb_days[tb_days.length] = [8, 8];
        tb_days[tb_days.length] = [8, 21];
    } else if (kwargs['city'] == 6) {  /* Badajoz */
        tb_days[tb_days.length] = [1, 16];
        tb_days[tb_days.length] = [2, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [5, 24];
        tb_days[tb_days.length] = [8, 8];
    } else if (kwargs['city'] == 8) {  /* Barcelona */
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = holyWeek(50);
        tb_days[tb_days.length] = [5, 24];
        tb_days[tb_days.length] = [8, 11];
        tb_days[tb_days.length] = [8, 24];
    } else if (kwargs['city'] == 48) {  /* Bizkaia */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(1);
    } else if (kwargs['city'] == 9) {  /* Burgos */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [3, 23];
        tb_days[tb_days.length] = [5, 29];
        tb_days[tb_days.length] = [7, 15];
    } else if (kwargs['city'] == 39) {  /* Cantabria */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [5, 28];
        tb_days[tb_days.length] = [8, 15];
    } else if (kwargs['city'] == 12) {  /* Castellón */
        tb_days[tb_days.length] = [2, 19];
        tb_days[tb_days.length] = holyWeek(-28);
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = [5, 24];
        tb_days[tb_days.length] = [5, 29];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [9, 9];
    } else if (kwargs['city'] == 51) {  /* Ceuta */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [5, 13];
        tb_days[tb_days.length] = [7, 5];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [8, 2];
    } else if (kwargs['city'] == 13) {  /* Ciudad Real */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(50);
        tb_days[tb_days.length] = [4, 31];
        tb_days[tb_days.length] = holyWeek(60);
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [7, 22];
    } else if (kwargs['city'] == 16) {  /* Cuenca */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 31];
        tb_days[tb_days.length] = holyWeek(60);
        tb_days[tb_days.length] = [5, 1];
        tb_days[tb_days.length] = [7, 15];
    } else if (kwargs['city'] == 10) {  /* Cáceres */
        tb_days[tb_days.length] = [2, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [3, 23];
        tb_days[tb_days.length] = [4, 31];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [8, 9];
    } else if (kwargs['city'] == 11) {  /* Cádiz */
        tb_days[tb_days.length] = holyWeek(-49);
        tb_days[tb_days.length] = [1, 28];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [8, 7];
    } else if (kwargs['city'] == 14) {  /* Córdoba */
        tb_days[tb_days.length] = [1, 28];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [7, 16];
        tb_days[tb_days.length] = [8, 8];
        tb_days[tb_days.length] = [9, 24];
    } else if (kwargs['city'] == 17) {  /* Girona */
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = [5, 24];
        tb_days[tb_days.length] = [6, 25];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [8, 11];
        tb_days[tb_days.length] = [9, 29];
        tb_days[tb_days.length] = [11, 26];
    } else if (kwargs['city'] == 18) {  /* Granada */
        tb_days[tb_days.length] = [0, 2];
        tb_days[tb_days.length] = [2, 1];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(60);
        tb_days[tb_days.length] = [7, 15];
    } else if (kwargs['city'] == 19) {  /* Guadalajara */
        tb_days[tb_days.length] = holyWeek(-3)  ;
        tb_days[tb_days.length] = [4, 31];
        tb_days[tb_days.length] = holyWeek(60);
        tb_days[tb_days.length] = [8, 8];
        tb_days[tb_days.length] = addDays([8, 8], 4, 4);
    } else if (kwargs['city'] == 21) {  /* Huelva */
        tb_days[tb_days.length] = [1, 28];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [7, 3];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [8, 8];
    } else if (kwargs['city'] == 22) {  /* Huesca */
        tb_days[tb_days.length] = [0, 22];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [3, 23];
        tb_days[tb_days.length] = [7, 10];
        tb_days[tb_days.length] = [7, 15];
    } else if (kwargs['city'] == 7) {  /* Illes Balears */
        tb_days[tb_days.length] = [0, 20];
        tb_days[tb_days.length] = [2, 1];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [5, 24];
    } else if (kwargs['city'] == 23) {  /* Jaén */
        tb_days[tb_days.length] = [2, 1];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [5, 11];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [25, 11];
    } else if (kwargs['city'] == 26) {  /* La Rioja */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = [5, 9];
    } else if (kwargs['city'] == 35) {  /* Las Palmas */
        tb_days[tb_days.length] = holyWeek(-47);
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [5, 24];
        tb_days[tb_days.length] = [7, 5];
        tb_days[tb_days.length] = addDays([7, 5], 7, 0);
        v1 = tb_days[tb_days.length - 1];
    } else if (kwargs['city'] == 24) {  /* León */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [3, 23];
        tb_days[tb_days.length] = [5, 24];
        tb_days[tb_days.length] = [7, 5];
        tb_days[tb_days.length] = [9, 4];

        if (addDays([7, 5], 6, 0)[1] > 15) {
            tb_days[tb_days.length] = addDays([7, 5], 6, 0);
            v1 = tb_days[tb_days.length - 1];
        } else {
            tb_days[tb_days.length] = [7, 5];
        }
    } else if (kwargs['city'] == 25) {  /* Lleida */
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = [4, 11];
        tb_days[tb_days.length] = [5, 24];
        tb_days[tb_days.length] = [8, 11];
        tb_days[tb_days.length] = [8, 29];
    } else if (kwargs['city'] == 27) {  /* Lugo */
        tb_days[tb_days.length] = holyWeek(-47);
        tb_days[tb_days.length] = [2, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 17];
        tb_days[tb_days.length] = [9, 5];
    } else if (kwargs['city'] == 28) {  /* Madrid */
        tb_days[tb_days.length] = [2, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 2];
        tb_days[tb_days.length] = [4, 15];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [9, 5];
        tb_days[tb_days.length] = [10, 9];
    } else if (kwargs['city'] == 52) {  /* Melilla */
        tb_days[tb_days.length] = [2, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [8, 8];
        tb_days[tb_days.length] = [8, 17];
    } else if (kwargs['city'] == 30) {  /* Murcia */
        tb_days[tb_days.length] = [2, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(2);
        tb_days[tb_days.length] = [5, 9];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = addDays([8, 1], 13, 1);
    } else if (kwargs['city'] == 29) {  /* Málaga */
        tb_days[tb_days.length] = [1, 28];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [7, 19];
        tb_days[tb_days.length] = [8, 8];
    } else if (kwargs['city'] == 31) {  /* Navarra */
        tb_days[tb_days.length] = [2, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [10, 9];
    } else if (kwargs['city'] == 32) {  /* Ourense */
        tb_days[tb_days.length] = holyWeek(-47);
        tb_days[tb_days.length] = [2, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 17];
        tb_days[tb_days.length] = [5, 24];
        tb_days[tb_days.length] = [6, 25];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [10, 11];
    } else if (kwargs['city'] == 34) {  /* Palencia */
        tb_days[tb_days.length] = [1, 2];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [3, 23];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [8, 2];
        tb_days[tb_days.length] = [10, 11];
    } else if (kwargs['city'] == 36) {  /* Pontevedra */
        tb_days[tb_days.length] = holyWeek(-46);
        tb_days[tb_days.length] = [2, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 17];
        tb_days[tb_days.length] = [6, 11];
        tb_days[tb_days.length] = [6, 25];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [10, 11];
    } else if (kwargs['city'] == 37) {  /* Salamanca */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(8);
        tb_days[tb_days.length] = [3, 23];
        tb_days[tb_days.length] = [5, 12];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [8, 8];
        tb_days[tb_days.length] = [10, 11];
    } else if (kwargs['city'] == 38) {  /* Santa Cruz de Tenerife */
        tb_days[tb_days.length] = [1, 2];
        tb_days[tb_days.length] = holyWeek(-47);
        tb_days[tb_days.length] = holyWeek(-46);
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 30];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [6, 7];
        tb_days[tb_days.length] = [10, 11];
    } else if (kwargs['city'] == 40) {  /* Segovia */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [5, 29];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [9, 25];
    } else if (kwargs['city'] == 41) {  /* Sevilla */
        tb_days[tb_days.length] = [1, 28];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(17);
        tb_days[tb_days.length] = holyWeek(60);
        tb_days[tb_days.length] = [7, 15];
    } else if (kwargs['city'] == 42) {  /* Soria */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [3, 23];
        tb_days[tb_days.length] = [5, 24];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [9, 2];
    } else if (kwargs['city'] == 43) {  /* Tarragona */
        tb_days[tb_days.length] =
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = [5, 24];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [7, 19];
        tb_days[tb_days.length] = [8, 11];
        tb_days[tb_days.length] = [8, 23];
    } else if (kwargs['city'] == 44) {  /* Teruel */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(2);
        tb_days[tb_days.length] = [3, 23];
        tb_days[tb_days.length] = addDays([6, 1], 7, 7);
        v1 = tb_days[tb_days.length - 1];
        tb_days[tb_days.length] = [7, 15];
    } else if (kwargs['city'] == 45) {  /* Toledo */
        tb_days[tb_days.length] = [0, 23];
        tb_days[tb_days.length] = [2, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = holyWeek(60);
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [11, 9];
    } else if (kwargs['city'] == 46) {  /* Valencia */
        tb_days[tb_days.length] = [0, 22];
        tb_days[tb_days.length] = [2, 19];
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = holyWeek(8);
        tb_days[tb_days.length] = [5, 24];
        tb_days[tb_days.length] = [9, 9];
        tb_days[tb_days.length] = [11, 9];
    } else if (kwargs['city'] == 47) {  /* Valladolid */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [3, 23];
        tb_days[tb_days.length] = [4, 13];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [8, 8];
        tb_days[tb_days.length] = [11, 9];
    } else if (kwargs['city'] == 49) {  /* Zamora */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [3, 23];
        tb_days[tb_days.length] = holyWeek(49, 7);
        v1 = tb_days[tb_days.length - 1];
        tb_days[tb_days.length] = [5, 29];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [11, 9];
    } else if (kwargs['city'] == 50) {  /* Zaragoza */
        tb_days[tb_days.length] = [0, 29];
        tb_days[tb_days.length] = [2, 5];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [3, 23];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [11, 9];
    } else if (kwargs['city'] == 5) {  /* Ávila */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [3, 23];
        tb_days[tb_days.length] = [4, 2];
        tb_days[tb_days.length] = [7, 15];
        tb_days[tb_days.length] = [9, 15];
        tb_days[tb_days.length] = [11, 9];
    }

    var out = [];
    var ind = 0;
    var month = kwargs['dmonth'] - 1;

    $.each(tb_days, function (i, item) {
        var aux = item;
        
        if (aux[0] == month) {
            var weekDay = [7, 1, 2, 3, 4, 5, 6][(new Date(kwargs['year'], item[0], item[1])).getDay()];
            
            if (weekDay == 7) {
                if (((item[0] == v0[0]) && (item[1] == v0[1]))
                        || ((item[0] == v1[0]) && (item[1] == v1[1]))) {
                    aux = item;
                } else {
                    aux = addDays(item, 1);
                }
            }

            if (aux[0] == month) {
                out[++ind] = aux[1];
            }
        }
    });
    /*000000*/
    // ordenar salida
    console.log(out.sort());
    /*000000*/

    return out;
}
// Calcular el Domingo de resurrecion, Semana Santa y sumarle dias
function holyWeek(days = 0, weekday = null) {
    var k = parseInt(kwargs['year'] / 100);
    var q = parseInt(k / 4);
    var d = ((19 * (kwargs['year'] % 19)) + ((15 - (parseInt((13 + (8 * k)) / 25)) + k - q) % 30)) % 30;
    var e = ((2 * (kwargs['year'] % 4)) + (4 * (kwargs['year'] % 7)) + (6 * d) + ((4 + k - q) % 7)) % 7;

    var sun = new Date(kwargs['year'], 3, d + e - 9);
    if ((d + e) < 10) {
        sun = new Date(kwargs['year'], 2, d + e + 22);
    }
    
    return addDays([sun.getMonth(), sun.getDate()], days, weekday);
}

// Calcular dia a una fecha dada
function addDays(mmdd = [], days = 0, weekday = null) {
    var out = new Date(kwargs['year'], mmdd[0], mmdd[1] + days);

    if (weekday != null) {
        var i = [7, 1, 2, 3, 4, 5, 6][out.getDay()];
        while (i != weekday) {
            out = new Date(out.getFullYear(), out.getMonth(), out.getDate() + 1);
            if (i++ > 6) {
                i = 0;
            }
        }
    }

    return [out.getMonth(), out.getDate()];
}

// Tamaño fuente a la anchura dada en la function
function fontWH(msg = '', maxWidth = 0, typeFont = '##px') {
    var auxCanvas = document.createElement('fontwidth');
    var auxContext = canvas.getContext('2d');
    auxCanvas.width = maxWidth;

    var fontW = 0;
    var auxType = typeFont.replace('##', fontW);
    auxContext.font = auxType;

    // Incrementar fuente hasta que sea igual a la anchura dada
    while (auxContext.measureText(msg).width < maxWidth) {
        auxType = typeFont.replace('##', ++fontW);
        auxContext.font = auxType;
    }

    // Reduce fuente hasta que sea igual a la anchura dada
    if (auxContext.measureText(msg).width > maxWidth) {
        auxType = typeFont.replace('##', --fontW);
        auxContext.font = auxType;
    }

    auxCanvas.remove();

    return [fontW, auxContext.measureText(msg).actualBoundingBoxAscent, auxContext.font];
}

// Dibujar el cnv
function draw(cnv) {
    cnv.width  = 595;
    cnv.height = 842;
    var month = kwargs['dmonth'];

    var ctx = cnv.getContext('2d');
   
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.rect(0, 0, cnv.width, cnv.height);
    ctx.fillStyle = kwargs['color'];
    ctx.fill();
    
    var w = cnv.width;
    var h = cnv.height;
    
    // Establecer imagen de fondo
    try {
        var img_w = kwargs['img'].width;
        var img_h = kwargs['img'].height;

        var img_pos = [0, 0, w, h];
        var n       = 1;

        if (img_w > img_h) {
            n = (w * img_h) / img_w;
            
            if (month == 0) {
                img_pos = [0, (h - n) / 2, w, n];
            } else {
                if (n <= h / 2) {
                    img_pos = [0, ((h / 2) - n) / 2, w, n];
                } else {
                    n = ((h / 2) * img_w) / img_h;
                    img_pos = [(w - n) / 2, 0, n, h / 2];
                }
            }
        } else if (img_w < img_h) {
            n = (w * img_h) / h;
            
            if (month == 0) {
                img_pos = [(w - n) / 2, 0, n, h];
            } else {
                img_pos = [(w - (n / 2)) / 2, 0, n / 2, h / 2];
            }
        } else {
            if (month == 0) {
                img_pos = [0, ((h - w) / 2), w, w];
            } else {
                img_pos = [(w / 2 - h / 4), 0, h / 2, h / 2];
            }
        }

        ctx.drawImage(kwargs['img'], img_pos[0], img_pos[1], img_pos[2], img_pos[3]);
    } catch (err) {
        var img_w = 0;
    }

    // Dibujar el mes o la portada
    var typeFont = '##px \'Courier New monospace\'';

    if (month == 0) {
        msg = 'Calendario ' + kwargs['year'];

        var infoFont = fontWH(msg, w * (1 - 0.20), typeFont);
        ctx.font = infoFont[2];

        ctx.fillStyle = InversoColor(kwargs['color']);

        if (kwargs['position'] == 'u') {
            ctx.fillText(msg, (w - w * (1 - 0.20)) / 2, (h / 12));
        } else if (kwargs['position'] == 'm') {
            ctx.fillText(msg, (w - w * (1 - 0.20)) / 2, (h / 2) + infoFont[1]);
        } else if (kwargs['position'] == 'b') {
            ctx.fillText(msg, (w - w * (1 - 0.20)) / 2, h - infoFont[1]);
        }
    } else {
        var x = 0;
        var y = 0;
        month = month - 1;

        var tb_msg = [];
        tb_msg[y] = ['  ', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

        var infoFont = fontWH('#'.repeat((tb_msg[0].toString()).length), cnv.width * (1 - 0.20), typeFont);
        ctx.font = infoFont[2];

        ant_NumberWeek = new Date(kwargs['year'], month, 1).iso8601Week();
        tb_msg[++y] = [];
        tb_msg[y][x] = ('0' + parseInt(ant_NumberWeek).toString()).slice(-2);

        var weekDay = [7, 1, 2, 3, 4, 5, 6][(new Date(kwargs['year'], month, 1)).getDay()];

        for (x = 1; x < weekDay; x++) {
            tb_msg[y][x] = '  ';
        }

        for (var j = 1; j <= new Date(kwargs['year'], kwargs['dmonth'], 0).getDate(); j++) {
            act_NumberWeek = new Date(kwargs['year'], month, j).iso8601Week();

            if (act_NumberWeek != ant_NumberWeek) {
                x = 0;
                ant_NumberWeek = act_NumberWeek;

                tb_msg[++y] = [];
                tb_msg[y][x++] = ('0' + parseInt(ant_NumberWeek).toString()).slice(-2);
            }

            tb_msg[y][x++] = ('0' + parseInt(j).toString()).slice(-2);
        }

        w = cnv.width;
        h = cnv.height;

        var party = partyDays();
        var z = 0;

        ctx.beginPath();
        ctx.moveTo(infoFont[0] + 20, (h / 2));
        ctx.lineTo(infoFont[0] + 20, h);
        ctx.strokeStyle = InversoColor(kwargs['color']);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, (h / 2) + (2 * infoFont[1]) + 20);
        ctx.lineTo(w, (h / 2) + (2 * infoFont[1]) + 20);
        ctx.strokeStyle = InversoColor(kwargs['color']);
        ctx.stroke();

        for (var y = 0; y < tb_msg.length; y++) {
            for (var x = 0; x < (tb_msg[y]).length; x++) {
                // coordenadas
                var aux_x = (x * (w / (tb_msg[0]).length)) + 10;
                var aux_y = ((y + 1) * (h / 15)) + (h / 2);
                // Fase lunar
                if (x != 0 && y != 0 && tb_msg[y][x] != '  ') {
                    var moon = (new Date(kwargs['year'], month, tb_msg[y][x])).moonfase()[0];

                    ctx.save();
                    ctx.font = (infoFont[0] / 4) + 'px \'Material Symbols Outlined\'';
                    ctx.fillStyle = InversoColor(kwargs['color']);
                    var rotate = false;
                    msg = ''

                    switch(moon) {
                        case 0:
                            msg = '';
                            break;
                        case 1:
                            msg = 'brightness_3';
                            break;
                        case 2:
                            msg = 'brightness_2';
                            break;
                        case 3:
                            msg = 'dark_mode';
                            break;
                        case 4:
                            msg = 'brightness_1';
                            break;
                        case 5:
                            rotate = true;
                            msg = 'dark_mode';
                            break;
                        case 6:
                            rotate = true;
                            msg = 'brightness_2';
                            break;
                        case 7:
                            rotate = true;
                            msg = 'brightness_3';
                            break;
                    }

                    if (rotate) {
                        ctx.rotate(1.0 * Math.PI);
                        ctx.fillText(msg, -1 * aux_x - 10, -1 * aux_y);
                    } else {
                        ctx.fillText(msg, aux_x, aux_y + (infoFont[1] / 3));
                    }

                    ctx.restore();
                }
                ctx.font = infoFont[2];
                ctx.fillStyle = InversoColor(kwargs['color']);

                if (x == 0 || y == 0) {
                    ctx.font = 'italic ' + infoFont[2];
                } else {
                    if (party[z] == tb_msg[y][x]) {
                        z++;
                        ctx.beginPath();
                        ctx.rect(aux_x - 5, aux_y + 5, 1.3 * infoFont[0], -1.5 * infoFont[1]);
                        ctx.strokeStyle = InversoColor(kwargs['color']);
                        ctx.stroke();
                        ctx.font = 'bold ' + infoFont[2];
                    }
                }

                ctx.fillText(tb_msg[y][x], aux_x, aux_y);
            }
        }
        // Pie del mes
        ctx.font = 'italic ' + infoFont[2];
        ctx.fillStyle = InversoColor(kwargs['color']);

        name_month = new Intl.DateTimeFormat(userLanguage, { month: 'long'}).format(new Date(kwargs['year'], month));
        msg = name_month.capitalize() + (' ').repeat(10 - name_month.length);

        x = 3;
        y = 6;
        ctx.fillText(msg, (x * (w / 8)) + 10, ((y + 1) * (h / 15)) + (h / 2));

        x = 6;
        ctx.fillText(kwargs['year'], (x * (w / 8)) + 10, ((y + 1) * (h / 15)) + (h / 2));
    }
}
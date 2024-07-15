/* JavaScript */
/* https://www.degraeve.com/reference/urlencoding.php */
// Variables
var kwargs = {};
var cps = [];

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
    
    for (var i = 0; i < 12; i++) {
        var name_month = new Intl.DateTimeFormat(userLanguage, { month: 'long'}).format(new Date(y, i));
        $('#dmonth').append(''
            + '<div>'
            + '    <div>' + name_month.capitalize() + '</div>'
            + '    <div><input type="file" accept="image/*" id="image-' + ('0' + parseInt(i + 1).toString()).slice(-2) + '" ></div>'
            + '    <div><button class="btn fa fa-download" id="d-' + ('0' + parseInt(i + 1).toString()).slice(-2) + '"></button></div>'
            + '</div>');
    }

    $('[name=year]').change(function(e) {update()});
    $('#image-00, #image-01').change(function(e) {
        setColors(e, parseInt((this.id).substr(6,9)));
    });

    // Solo permitir descargar si tiene una imagen cargada
    $("[class='btn fa fa-download']").click(function(e) {download(parseInt((this.id).substr(3,6)))});

    // Posicion del texto de la portada
    $('[name=position]').change(function(e) {update()});
    $('[name=city]').change(function(e) {update()});

    update();
}

// Actualizar valores de la clase
function update() {
    for (var i = 0; i <= 12; i++) {
        if (typeof kwargs[i] == 'undefined') {
            kwargs[i] = {'colors': [], 'img': null};

            kwargs[i]['colors'][0] =  '#222831';
            kwargs[i]['colors'][1] =  '#393E46';
            kwargs[i]['colors'][2] =  '#00ADB5';
            kwargs[i]['colors'][3] =  '#EEEEEE';
            kwargs[i]['colors'][4] =  '#FFFFFF';
        }
    }

    kwargs['year']     = $('[name=year]').val();
    kwargs['position'] = $('[name=position]').val();
    kwargs['city']     = $('[name=city]').val();
}

// Asignar el valor a los colores
function setColors(e, i) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var img = new Image();
        img.onload = function() {
            // Extraer colores
            var colors = (new ColorThief()).getPalette(img, 5);
            
            
            /*
            for (var j = 0; j < colors.length; j++) {
                kwargs[i]['colors'][j] = rgbToHex(colors[j][0], colors[j][1], colors[j][2]);
            }
            */
            
            kwargs[i]['img'] = img;
/*
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
            } else {
                aux_month = i - 1;

                // 595 x 421
                h = canvas.height / 2;
                ctx.drawImage(img, 0, 0, canvas.width, h);
            }
*/
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}

// Descargar la imagen
function download(i) {
    // Prueba
    for (var i = 0; i <= 12; i++) {
        console.log(kwargs[i]['img']);
    }
    
    // Introducir los para generar la imagen
    draw(i);
    // Convertir el lienzo a una imagen base64
    var dataURL = canvas.toDataURL('image/png');

    // Crear un enlace para descargar la imagen
    var downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = kwargs['year'] + ('0' + parseInt(i).toString()).slice(-2) + '.png';

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
function partyDays(month) {
    var tb_days = [[1, 1], [1, 6], [5, 1], [8, 15], [10, 12],  [11, 1], [12, 25], [12, 6], [12, 8]];

    tb_days[tb_days.length] = holyWeek();
    
    var v0 = tb_days[tb_days.length - 1];
    var v1 = [0, 0];
    
    tb_days[tb_days.length] = holyWeek(-2);

    if (kwargs['city'] == 20) {  /* Gipuzkoa */
        tb_days[tb_days.length] = [1, 20];
        tb_days[tb_days.length] = [19, 3];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [9, 9];
    } else if (kwargs['city'] == 15)  {  /* A Coruña */
        tb_days[tb_days.length] = [16, 2];
        tb_days[tb_days.length] = [19, 3];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [5, 17];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [8, 24];
    } else if (kwargs['city'] == 2)  {  /* Albacete */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [5, 31];
        tb_days[tb_days.length] = [6, 3];
        tb_days[tb_days.length] = [6, 24];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [9, 8];
    } else if (kwargs['city'] == 3)  {  /* Alicante */
        tb_days[tb_days.length] = [3, 19];
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = holyWeek(11);
        tb_days[tb_days.length] = [6, 24];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [10, 9];
    } else if (kwargs['city'] == 4)  {  /* Almería */
        tb_days[tb_days.length] = [3, 1];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [6, 24];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [8, 16];
        tb_days[tb_days.length] = addDays([8, 1], 22, 5);
    } else if (kwargs['city'] == 1)  {  /* Araba/Álava */
        tb_days[tb_days.length] = [3, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = [4, 28];
        tb_days[tb_days.length] = [7, 25];
        tb_days[tb_days.length] = [8, 5];
        tb_days[tb_days.length] = [8, 15];
    } else if (kwargs['city'] == 33)  {  /* Asturias */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [8, 16];
        tb_days[tb_days.length] = [9, 8];
        tb_days[tb_days.length] = [9, 21];
    } else if (kwargs['city'] == 6)  {  /* Badajoz */
        tb_days[tb_days.length] = [2, 16];
        tb_days[tb_days.length] = [3, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [6, 24];
        tb_days[tb_days.length] = [9, 8];
    } else if (kwargs['city'] == 8)  {  /* Barcelona */
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = holyWeek(50);
        tb_days[tb_days.length] = [6, 24];
        tb_days[tb_days.length] = [9, 11];
        tb_days[tb_days.length] = [9, 24];
    } else if (kwargs['city'] == 48)  {  /* Bizkaia */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(1);
    } else if (kwargs['city'] == 9)  {  /* Burgos */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 23];
        tb_days[tb_days.length] = [6, 29];
        tb_days[tb_days.length] = [8, 15];
    } else if (kwargs['city'] == 39)  {  /* Cantabria */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [6, 28];
        tb_days[tb_days.length] = [9, 15];
    } else if (kwargs['city'] == 12)  {  /* Castellón */
        tb_days[tb_days.length] = [3, 19];
        tb_days[tb_days.length] = holyWeek(-28);
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = [6, 24];
        tb_days[tb_days.length] = [6, 29];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [10, 9];
    } else if (kwargs['city'] == 51)  {  /* Ceuta */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [6, 13];
        tb_days[tb_days.length] = [8, 5];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [9, 2];
    } else if (kwargs['city'] == 13)  {  /* Ciudad Real */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(50);
        tb_days[tb_days.length] = [5, 31];
        tb_days[tb_days.length] = holyWeek(60);
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [8, 22];
    } else if (kwargs['city'] == 16)  {  /* Cuenca */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [5, 31];
        tb_days[tb_days.length] = holyWeek(60);
        tb_days[tb_days.length] = [6, 1];
        tb_days[tb_days.length] = [8, 15];
    } else if (kwargs['city'] == 10)  {  /* Cáceres */
        tb_days[tb_days.length] = [3, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 23];
        tb_days[tb_days.length] = [5, 31];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [9, 9];
    } else if (kwargs['city'] == 11)  {  /* Cádiz */
        tb_days[tb_days.length] = holyWeek(-49);
        tb_days[tb_days.length] = [2, 28];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [9, 7];
    } else if (kwargs['city'] == 14)  {  /* Córdoba */
        tb_days[tb_days.length] = [2, 28];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [8, 16];
        tb_days[tb_days.length] = [9, 8];
        tb_days[tb_days.length] = [10, 24];
    } else if (kwargs['city'] == 17)  {  /* Girona */
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = [6, 24];
        tb_days[tb_days.length] = [7, 25];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [9, 11];
        tb_days[tb_days.length] = [10, 29];
        tb_days[tb_days.length] = [12, 26];
    } else if (kwargs['city'] == 18)  {  /* Granada */
        tb_days[tb_days.length] = [1, 2];
        tb_days[tb_days.length] = [3, 1];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(60);
        tb_days[tb_days.length] = [8, 15];
    } else if (kwargs['city'] == 19)  {  /* Guadalajara */
        tb_days[tb_days.length] = holyWeek(-3)  ;
        tb_days[tb_days.length] = [5, 31];
        tb_days[tb_days.length] = holyWeek(60);
        tb_days[tb_days.length] = [9, 8];
        tb_days[tb_days.length] = addDays([9, 8], 4, 4);
    } else if (kwargs['city'] == 21)  {  /* Huelva */
        tb_days[tb_days.length] = [2, 28];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [8, 3];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [9, 8];
    } else if (kwargs['city'] == 22)  {  /* Huesca */
        tb_days[tb_days.length] = [1, 22];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 23];
        tb_days[tb_days.length] = [8, 10];
        tb_days[tb_days.length] = [8, 15];
    } else if (kwargs['city'] == 7)  {  /* Illes Balears */
        tb_days[tb_days.length] = [1, 20];
        tb_days[tb_days.length] = [3, 1];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [6, 24];
    } else if (kwargs['city'] == 23)  {  /* Jaén */
        tb_days[tb_days.length] = [3, 1];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [6, 11];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [25, 11];
    } else if (kwargs['city'] == 26)  {  /* La Rioja */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = [6, 9];
    } else if (kwargs['city'] == 35)  {  /* Las Palmas */
        tb_days[tb_days.length] = holyWeek(-47);
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [6, 24];
        tb_days[tb_days.length] = [8, 5];
        tb_days[tb_days.length] = addDays([8, 5], 7, 0);
        v1 = tb_days[tb_days.length - 1];
    } else if (kwargs['city'] == 24)  {  /* León */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 23];
        tb_days[tb_days.length] = [6, 24];
        tb_days[tb_days.length] = [8, 5];
        tb_days[tb_days.length] = [10, 4];

        if (addDays([8, 5], 6, 0)[1] > 15) {
            tb_days[tb_days.length] = addDays([8, 5], 6, 0);
            v1 = tb_days[tb_days.length - 1];
        } else {
            tb_days[tb_days.length] = [8, 5];
        }
    } else if (kwargs['city'] == 25)  {  /* Lleida */
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = [5, 11];
        tb_days[tb_days.length] = [6, 24];
        tb_days[tb_days.length] = [9, 11];
        tb_days[tb_days.length] = [9, 29];
    } else if (kwargs['city'] == 27)  {  /* Lugo */
        tb_days[tb_days.length] = holyWeek(-47);
        tb_days[tb_days.length] = [3, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [5, 17];
        tb_days[tb_days.length] = [10, 5];
    } else if (kwargs['city'] == 28)  {  /* Madrid */
        tb_days[tb_days.length] = [3, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [5, 2];
        tb_days[tb_days.length] = [5, 15];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [10, 5];
        tb_days[tb_days.length] = [11, 9];
    } else if (kwargs['city'] == 52)  {  /* Melilla */
        tb_days[tb_days.length] = [3, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [9, 8];
        tb_days[tb_days.length] = [9, 17];
    } else if (kwargs['city'] == 30)  {  /* Murcia */
        tb_days[tb_days.length] = [3, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(2);
        tb_days[tb_days.length] = [6, 9];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = addDays([9, 1], 13, 1);
    } else if (kwargs['city'] == 29)  {  /* Málaga */
        tb_days[tb_days.length] = [2, 28];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [8, 19];
        tb_days[tb_days.length] = [9, 8];
    } else if (kwargs['city'] == 31)  {  /* Navarra */
        tb_days[tb_days.length] = [3, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [11, 9];
    } else if (kwargs['city'] == 32)  {  /* Ourense */
        tb_days[tb_days.length] = holyWeek(-47);
        tb_days[tb_days.length] = [3, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [5, 17];
        tb_days[tb_days.length] = [6, 24];
        tb_days[tb_days.length] = [7, 25];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [11, 11];
    } else if (kwargs['city'] == 34)  {  /* Palencia */
        tb_days[tb_days.length] = [2, 2];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 23];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [9, 2];
        tb_days[tb_days.length] = [11, 11];
    } else if (kwargs['city'] == 36)  {  /* Pontevedra */
        tb_days[tb_days.length] = holyWeek(-46);
        tb_days[tb_days.length] = [3, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [5, 17];
        tb_days[tb_days.length] = [7, 11];
        tb_days[tb_days.length] = [7, 25];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [11, 11];
    } else if (kwargs['city'] == 37)  {  /* Salamanca */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(8);
        tb_days[tb_days.length] = [4, 23];
        tb_days[tb_days.length] = [6, 12];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [9, 8];
        tb_days[tb_days.length] = [11, 11];
    } else if (kwargs['city'] == 38)  {  /* Santa Cruz de Tenerife */
        tb_days[tb_days.length] = [2, 2];
        tb_days[tb_days.length] = holyWeek(-47);
        tb_days[tb_days.length] = holyWeek(-46);
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [5, 30];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [7, 7];
        tb_days[tb_days.length] = [11, 11];
    } else if (kwargs['city'] == 40)  {  /* Segovia */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [6, 29];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [10, 25];
    } else if (kwargs['city'] == 41)  {  /* Sevilla */
        tb_days[tb_days.length] = [2, 28];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(17);
        tb_days[tb_days.length] = holyWeek(60);
        tb_days[tb_days.length] = [8, 15];
    } else if (kwargs['city'] == 42)  {  /* Soria */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 23];
        tb_days[tb_days.length] = [6, 24];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [10, 2];
    } else if (kwargs['city'] == 43)  {  /* Tarragona */
        tb_days[tb_days.length] =
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = [6, 24];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [8, 19];
        tb_days[tb_days.length] = [9, 11];
        tb_days[tb_days.length] = [9, 23];
    } else if (kwargs['city'] == 44)  {  /* Teruel */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(2);
        tb_days[tb_days.length] = [4, 23];
        tb_days[tb_days.length] = addDays([7, 1], 7, 0);
        v1 = tb_days[tb_days.length - 1];
        tb_days[tb_days.length] = [8, 15];
    } else if (kwargs['city'] == 45)  {  /* Toledo */
        tb_days[tb_days.length] = [1, 23];
        tb_days[tb_days.length] = [3, 19];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = holyWeek(60);
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [12, 9];
    } else if (kwargs['city'] == 46)  {  /* Valencia */
        tb_days[tb_days.length] = [1, 22];
        tb_days[tb_days.length] = [3, 19];
        tb_days[tb_days.length] = holyWeek(1);
        tb_days[tb_days.length] = holyWeek(8);
        tb_days[tb_days.length] = [6, 24];
        tb_days[tb_days.length] = [10, 9];
        tb_days[tb_days.length] = [12, 9];
    } else if (kwargs['city'] == 47)  {  /* Valladolid */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 23];
        tb_days[tb_days.length] = [5, 13];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [9, 8];
        tb_days[tb_days.length] = [12, 9];
    } else if (kwargs['city'] == 49)  {  /* Zamora */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 23];
        tb_days[tb_days.length] = holyWeek(49, 0);
        v1 = tb_days[tb_days.length - 1];
        tb_days[tb_days.length] = [6, 29];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [12, 9];
    } else if (kwargs['city'] == 50)  {  /* Zaragoza */
        tb_days[tb_days.length] = [1, 29];
        tb_days[tb_days.length] = [5, 5];
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 23];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [12, 9];
    } else if (kwargs['city'] == 5)  {  /* Ávila */
        tb_days[tb_days.length] = holyWeek(-3);
        tb_days[tb_days.length] = [4, 23];
        tb_days[tb_days.length] = [5, 2];
        tb_days[tb_days.length] = [8, 15];
        tb_days[tb_days.length] = [10, 15];
        tb_days[tb_days.length] = [12, 9];
    }

    var out = [];
    var ind = -1;

    $.each(tb_days, function (i, item) {
        var aux = item;
        var weekday = new Date(kwargs['year'], item[0] - 1, item[1]);

        if (weekday.getDay() == 0) {
            
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
    });

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
        sun = new Date(kwargs['year'], 4, d + e + 22);
    }

    return addDays([sun.getMonth() + 1, sun.getDate()], days, weekday);
}

// Calcular dia a una fecha dada
function addDays(mmdd = [], days = 0, weekday = null) {
    var out = new Date(kwargs['year'], mmdd[0] - 1, mmdd[1] + days);

    if (weekday != null) {
        var i = out.getDay();
        while (i != weekday) {
            out = new Date(out.getFullYear(), out.getMonth(), out.getDate() + 1);
            if (i++ > 6) {
                i = 0;
            }
        }
    }

    return [out.getMonth() + 1, out.getDate()];
}

// Tamaño fuente a la anchura dada en la function
function fontWH(msg = '', maxWidth = 0) {
    var auxCanvas = document.createElement('fontwidth');
    var auxContext = canvas.getContext('2d');
    auxCanvas.width = maxWidth;
    
    var fontW = 0;
    auxContext.font = fontW + 'px Courier New monospace';
    
    // Incrementar fuente hasta que sea igual a la anchura dada
    while (auxContext.measureText(msg).width < maxWidth) {
        auxContext.font = (++fontW) + 'px Courier New monospace';
    }
    
    // Reduce fuente hasta que sea igual a la anchura dada
    if (auxContext.measureText(msg).width > maxWidth) {
        auxContext.font = (--fontW) + 'px Courier New monospace';
    }

    auxCanvas.remove();

    return [fontW, auxContext.measureText(msg).height];
}

// Dibujar el canvas
function draw(month) {
    // 595 x 842
    update();

    // Dibujar
    var w = canvas.width;
    var h = canvas.height;

    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = kwargs[month]['colors'][0];
    ctx.fill();

    if (month == 0) {
        msg = ' Calendario ' + kwargs['year'] + ' ';

        ctx.font = fontWH(msg, w)[0] + 'px Courier New monospace';
        ctx.fillStyle = kwargs[month]['colors'][4];

        if (kwargs['position'] == 'u') {
            ctx.fillText(msg, 0, (h / 12));
        } else if (kwargs['position'] == 'm') {
            ctx.fillText(msg, 0, (h / 2) + (h / 12));
        } else if (kwargs['position'] == 'b') {
            ctx.fillText(msg, 0, h - (h / 12));
        }
    } else {
        aux_month = month - 1;
        var x = 0;
        var y = 0;

        var tb_msg = [];
        tb_msg[y] = ['  ', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
        
        var infoFont = fontWH('#'.repeat((tb_msg[0].toString()).length), canvas.width)

        ctx.font = infoFont[0] + 'px Courier New monospace';

        ant_NumberWeek = new Date(kwargs['year'], aux_month, 1).iso8601Week();
        tb_msg[++y] = [];
        tb_msg[y][x] = ('0' + parseInt(ant_NumberWeek).toString()).slice(-2);
        
        var endX = (new Date(kwargs['year'], aux_month, 1)).getDay();

        for (x = 1; x < (endX == 0?7:0); x++) {
            tb_msg[y][x] = '  ';
        }
        
        for (var j = 1; j <= new Date(kwargs['year'], aux_month, 0).getDate(); j++) {
            act_NumberWeek = new Date(kwargs['year'], aux_month, j).iso8601Week();

            if (act_NumberWeek != ant_NumberWeek) {
                x = 0;
                ant_NumberWeek = act_NumberWeek;

                tb_msg[++y] = [];
                tb_msg[y][x++] = ('0' + parseInt(ant_NumberWeek).toString()).slice(-2);
            }

            tb_msg[y][x++] = ('0' + parseInt(j).toString()).slice(-2);
        }

        w = canvas.width;
        h = canvas.height;
        

        var party = partyDays(month);
        var z = 0;

        for (var y = 0; y < tb_msg.length; y++) {
            for (var x = 0; x < (tb_msg[y]).length; x++) {
                // coordenadas
                var aux_x = (x * (w / (tb_msg[0]).length)) + 10;
                //var aux_y = 
                // Fase lunar
                if (x != 0 && y != 0 && tb_msg[y][x] != '  ') {
                    var moon = (new Date(kwargs['year'], aux_month, tb_msg[y][x])).moonfase()[0];

                    if (moon == 1 || moon == 6) {
                        ctx.beginPath();
                        ctx.arc((x * (w / 8)) + 10, ((y + 1) * (h / 15)) + (h / 2), 5, 0 * Math.PI, 2 * Math.PI);
                        ctx.fillStyle = kwargs[month]['colors'][3];
                        ctx.fill();

                        ctx.beginPath();
                        ctx.arc(((x * (w / 8)) + 10) + (moon == 1?-1:1) * 1.5, ((y + 1) * (h / 15)) + (h / 2), 3.5, 0 * Math.PI, 2 * Math.PI);
                        ctx.fillStyle = kwargs[month]['colors'][0];
                        ctx.fill();
                    }
                    if (moon == 2 || moon == 7) {
                        ctx.beginPath();
                        ctx.arc((x * (w / 8)) + 10, ((y + 1) * (h / 15)) + (h / 2), 5, 0.5 * Math.PI, 1.5 * Math.PI, (moon == 2));
                        ctx.fillStyle = kwargs[month]['colors'][3];
                        ctx.fill();
                    }
                    if (moon == 3) {
                        ctx.beginPath();
                        ctx.arc((x * (w / 8)) + 10, ((y + 1) * (h / 15)) + (h / 2), 5, 1.0 * Math.PI, 0.5 * Math.PI);
                        ctx.fillStyle = kwargs[month]['colors'][3];
                        ctx.fill();
                    }
                    if (moon == 4) {
                        ctx.beginPath();
                        ctx.arc((x * (w / 8)) + 10, ((y + 1) * (h / 15)) + (h / 2), 5, 0 * Math.PI, 2 * Math.PI);
                        ctx.fillStyle = kwargs[month]['colors'][3];
                        ctx.fill();
                    }
                    if (moon == 5) {
                        ctx.beginPath();
                        ctx.arc((x * (w / 8)) + 10, ((y + 1) * (h / 15)) + (h / 2), 5, 0.5 * Math.PI, 1.0 * Math.PI);
                        ctx.fillStyle = kwargs[month]['colors'][3];
                        ctx.fill();
                    }
                }

                ctx.fillStyle = kwargs[month]['colors'][4];

                if (x == 0 || y == 0) {
                    ctx.fillStyle = kwargs[month]['colors'][2];
                } else {
                    if (party[z] == tb_msg[y][x]) {
                        z++;
                        ctx.fillStyle = kwargs[month]['colors'][2];
                    }
                }

                ctx.fillText(tb_msg[y][x], aux_x, ((y + 1) * (h / 15)) + (h / 2));
            }
        }

        ctx.fillStyle = kwargs[month]['colors'][2];

        name_month = new Intl.DateTimeFormat(userLanguage, { month: 'long'}).format(new Date(kwargs['year'], aux_month));

        msg = name_month + (' ').repeat(15 - name_month.length) + kwargs['year'];
        ctx.fillText(msg.capitalize(), (1 * (w / 8)) + 10, ((y + 1) * (h / 15)) + (h / 2));
    }
}
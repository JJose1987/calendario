/* JavaScript */
/* https://www.degraeve.com/reference/urlencoding.php */
// Variables
var kwargs = {};
const _CalendarPrint = new CalendarPrint(this.kwargs);

// Funciones
function main() {
    //Si es telefono girar la vista y las imagenes
    
    $('input[name=year]').val(++y);
    
    this._CalendarPrint = new CalendarPrint(this.kwargs);
    //this._CalendarPrint.sets();

    $('input[name=year]').change(function(e) {update()});
    $('#image-12').change(function(e) {setColors(e, parseInt((this.id).substr(6,9)))});

    update();
}

// Asignar valor del campo
function set(object) {
    var index = $(object).attr('name');
    this._CalendarPrint.set(index, $(object).val());

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
    
    alert(kwargs['year']);
}

// Asignar el valor a los colores
function setColors(e, i) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var img = new Image();
        img.onload = function() {
            kwargs[i]['colors'] = (new ColorThief()).getPalette(img, 5);
            update();
        };
        
        img.src = event.target.result;
    };
    
    reader.readAsDataURL(file);
}


/* JavaScript */
/* https://www.degraeve.com/reference/urlencoding.php */
// Variables
var kwargs = {0: {colors:[]}};
const _CalendarPrint = new CalendarPrint(this.kwargs);

// Funciones
function main() {
    //Si es telefono girar la vista y las imagenes
    this._CalendarPrint = new CalendarPrint(this.kwargs);
    //this._CalendarPrint.sets();

    $('#image-00').change(function(e) {setColors(e, 0)});

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
    alert('0 = ' + this._CalendarPrint['0_colors']);
    /*
    alert('1 = ' + this._CalendarPrint['0_colors'][1]);
    alert('2 = ' + this._CalendarPrint['0_colors'][2]);
    alert('3 = ' + this._CalendarPrint['0_colors'][3]);
    alert('4 = ' + this._CalendarPrint['0_colors'][4]);
    */
}

// Asignar el valor a los colores
function setColors(e, i) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var img = new Image();
        img.onload = function() {
            var colorThief = new ColorThief();
            
            //this.kwargs[i + '_colors'] = colorThief.getPalette(img, 5);
            
            this._CalendarPrint.set(i + '_colors', colorThief.getPalette(img, 5));
            update();
        };
        
        img.src = event.target.result;
    };
    
    reader.readAsDataURL(file);
}


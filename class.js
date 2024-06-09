/* JavaScript */
// Clases
class CalendarPrint {
    /* Constructor donde le pasamos los datos de entrada, para ello le pasamos el nombreparametro = VALUE */
    constructor(kwargs) {
        //*********************************************************************************
        this.kwargs = {}

        if (typeof this.kwargs['0_colors'] != 'undefined') {
            this.kwargs['0_colors'] = kwargs['0_colors'];
        } else {
            this.kwargs['0_colors'] = [];
        }
        //*********************************************************************************
    }
    
    /* Metodo para cargar varios valores */
    sets() {
        
    }

    /* Metodo para cargar el valor en el indice */
    set(ix, value) {
        //this.kwargs[ix] = value;
        
        if (typeof this.kwargs[ix] != 'undefined') {
            this.kwargs[ix] = value;
        } else {
            this.kwargs[ix] = null;
        }
    }

    /* Metodo para retornar la clase en cadena de caracteres */
    get str() {
        var out = '';

        return out;
    }

    /* Metodo para retornar el campo que le pidamos */
    get(ix) {
        if (this.kwargs[ix] != 'undefined') {
            return this.kwargs[ix];
        } else {
            return 'undefined';
        }
    }
}
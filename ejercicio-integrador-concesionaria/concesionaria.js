const autosImportados = require('./autos')

let concesionaria = {

    autos: autosImportados,

    buscarAuto: function (patente) {
        const autoBuscado = this.autos.find(auto => {
            return auto.patente == patente;
        });
        if (autoBuscado) {
            return autoBuscado;
        } else {
            return null;
        };
    },

    venderAuto: function (patente) {
        const autoAVender = this.buscarAuto(patente);
        if (!autoAVender) {
            return 'El auto no se encuentra';
        } else {
            autoAVender.vendido = true;
        }
        //this.autos[this.autos.indexOf(autoAVender)].vendido = true;
    },

    autosParaLaVenta: function () {
        const listaALaVenta = this.autos.filter(auto => {
            return auto.vendido == false;
        });
        return listaALaVenta;
    },

    autosNuevos: function () {
        const listaALaVenta = this.autosParaLaVenta();
        const listaCerosKmALaVenta = listaALaVenta.filter(auto => {
            return auto.km < 100;
        });
        return listaCerosKmALaVenta;
    },

    listaDeVentas: function () {
        const listaVendidos = this.autos.filter(auto => {
            return auto.vendido == true;
        });
        const arrayVentas = listaVendidos.map(auto => {
            let { precio } = auto;
            return precio;
        });
        return arrayVentas;
    },

    totalDeVentas: function () {
        const ventas = this.listaDeVentas();
        const montoTotal = ventas.reduce((acum, precio) => {
            return acum += precio;
        }, 0);
        return montoTotal;
    },

    puedeComprar: function (auto, persona) {
        let pagoEnCuotas = auto.precio / auto.cuotas;
        if (auto.precio <= persona.capacidadDePagoTotal && pagoEnCuotas <= persona.capacidadDePagoEnCuotas) {
            return true;
        } else {
            return false;
        };
    },
    
    autosQuePuedeComprar: function (persona) {
        let autosEnVenta = this.autosParaLaVenta();
        let autosAccesibles = autosEnVenta.filter(auto => {
            return this.puedeComprar(auto, persona);
        });
        return autosAccesibles;
    }
};




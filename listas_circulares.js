//Owen Arcega
class Base{
    constructor(nombre,minutos){
        this.nombre = nombre;
        this.minutos = minutos;
    }
}

class Ruta{
    constructor(){
        this.primero = null;
    }
    agregar(base){
        if(this.primero == null){
            this.primero = base;
            base.siguiente = this.primero;
            base.anterior = this.primero;
        } else {
            base.siguiente = this.primero;
            base.anterior = this.primero.anterior;
            this.primero.anterior = base;
            base.anterior.siguiente = base;
        }
    }

    imprimir(){
        if(this.primero == null){
            return false;
        } else {
            let aux = this.primero;
            let cond = "";
            let lista = "";
            while(cond != this.primero.nombre){
                lista += aux.nombre + "  ";
                aux = aux.siguiente;
                cond = aux.nombre;
            }
            return lista;
        }
    }

    buscar(nombre){
        if(this.primero == null){
            return null;
        }
        let aux = this.primero;
        let cond = "";
        while(cond != this.primero.nombre){
            if(aux.nombre == nombre){
                return aux;
            }
            aux = aux.siguiente;
            cond = aux.nombre;
        }
        return null;
    }

    eliminar(nombre){
        if(this.primero == null){
            return false;
        }
        let aux = this.primero;
        let cond = "";
        while(cond != this.primero.nombre){
            if(aux.nombre == nombre){
                if(aux.siguiente == null){
                    this.primero = null;
                    return null;
                }
                aux.siguiente.anterior = aux.anterior;
                aux.anterior.siguiente = aux.siguiente;
                if(aux.nombre == this.primero.nombre){
                    this.primero = this.primero.siguiente;
                }
                return true;
            }
            aux = aux.siguiente;
            cond = aux.nombre;
        }
        return false;
    }

    recorrido(baseInicio,horaInicio,minutoInicio,horaFin,minutoFin){
        if(this.primero == null){
            return false;
        }
        this.primero = this.buscar(baseInicio);
        let aux = this.primero;
        let cond = false;
        let tiempoInicio = (horaInicio*60) + minutoInicio;
        let tiempoFin = (horaFin*60) + minutoFin;
        console.log("Comenzó en la base: " + this.primero.nombre + ", a las: " + horaInicio + ":" + minutoInicio);
        while(cond == false){
            if(tiempoInicio >= tiempoFin){
                console.log("Finalizó la ruta en la base: " + aux.nombre + ", a las: " + Math.trunc(tiempoInicio/60) + ":" + Math.trunc(tiempoInicio%60));
                cond = true;
            } else {
                tiempoInicio += aux.siguiente.minutos;
                console.log("Pasó por la base: " + aux.siguiente.nombre + ", a las: " + Math.trunc(tiempoInicio/60) + ":" + Math.trunc(tiempoInicio%60));
                aux = aux.siguiente;
            }
        }
        return true;
    }
}

const ruta = new Ruta();
let base = new Base("1",20);
ruta.agregar(base);
base = new Base("2",30);
ruta.agregar(base);
base = new Base("3",15);
ruta.agregar(base);
base = new Base("4",10);
ruta.agregar(base);
console.log(ruta.imprimir());
console.log(ruta.recorrido("2",9,5,10,10));

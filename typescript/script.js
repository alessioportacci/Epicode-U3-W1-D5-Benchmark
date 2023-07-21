"use strict";
class Smartphone {
    constructor(creditoResiduo, numeroTelefono, costoMinuto = 0.20 //Di default sono 20 cent a chiamata (un po' caro?)
    ) {
        this.creditoResiduo = creditoResiduo;
        this.numeroTelefono = numeroTelefono;
        this.costoMinuto = costoMinuto;
        this.registroChiamate = [{ id: "0", durata: 1, data: new Date("2019-01-16") }]; //Purtroppo devo mettere una chiamata fantoccio per non impazzire suil controllo dei filtri
    }
    //#region Metodi getter
    getNumeroChiamate() {
        return this.registroChiamate.length;
    }
    getCreditoResiduo() {
        return this.creditoResiduo;
    }
    getNumeroTelefono() {
        return this.numeroTelefono;
    }
    getCostoMinuto() {
        return this.costoMinuto;
    }
    getRegistroChiamate() {
        return this.registroChiamate;
    }
    //#endregion
    //#region Metodi setter
    setCostoMinuto(nuovaTariffa) {
        this.costoMinuto = nuovaTariffa;
    }
    //#endregion
    //#region Altri metodi
    ricarica(euro) {
        this.creditoResiduo += euro;
    }
    chiamata(min) {
        //Calcolo il costo della chiamata
        let costoChiamata = this.costoMinuto * min;
        //Controllo se ho abbastanza credito
        if (costoChiamata > this.creditoResiduo)
            console.log(`Non hai abbastanza credito per effettuare questa chiamata`);
        else {
            this.creditoResiduo -= costoChiamata;
            //Lo aggiungo al registro di chiamate
            this.registroChiamate.push({
                id: this.registroChiamate.length.toString(),
                durata: min,
                data: new Date()
            });
            console.log(`Hai effettauto la chiamata, ti sono stati addebitati ${costoChiamata}€`);
        }
    }
    azzeraChiamate() {
        this.registroChiamate = [];
    }
    filtraChiamatePerDataOra(data) {
        //Ho dovuto metterle toDateString perché altrimenti non mi funzionava, dunno why
        return this.getRegistroChiamate().filter(chiamata => chiamata.data.toDateString() == data.toDateString());
    }
}
//Dichiaro il primo telefono
const pixel6 = new Smartphone(50, "3494575250");
console.log("PIXEL 6:");
//Costo minuto invariato a 0.20 e credito ancora di 50
console.log(`Costo al minuto: ${pixel6.getCostoMinuto()}     -     Credito rimasto: ${pixel6.getCreditoResiduo()}`);
//5 minuti di chiamata a 0.20, costo residuo dovrebbe essere 49
pixel6.chiamata(5);
console.log(`Costo al minuto: ${pixel6.getCostoMinuto()}     -     Credito rimasto: ${pixel6.getCreditoResiduo()}`);
//3 minuti di chiamata a 1, costo residuo dovrebbe essere 46
pixel6.setCostoMinuto(1);
pixel6.chiamata(3);
console.log(`Costo al minuto: ${pixel6.getCostoMinuto()}     -     Credito rimasto: ${pixel6.getCreditoResiduo()}`);
//Aggiungo un po' di credito e lo faccio tornare a 50
pixel6.ricarica(4);
console.log(`Credito residuo: ${pixel6.getCreditoResiduo()}`);
//Effettuo una chiamata SUPER!
pixel6.chiamata(700);
//Controllo il numero di chiamate, dovrebbe essere 3
console.log(`Numero di chiamate: ${pixel6.getNumeroChiamate()}`);
console.log(pixel6.getRegistroChiamate());
//Mi prendo le chiamate filtrate sulla prima data
console.log(`Prima chiamata filtrata:`);
console.log(pixel6.filtraChiamatePerDataOra(new Date("2019-01-16")));
//Azzero le chiamate e controllo di nuovo
pixel6.azzeraChiamate();
console.log(`Numero di chiamate: ${pixel6.getNumeroChiamate()}`);
console.log(pixel6.getRegistroChiamate());
//Controllo il numero di telefono
console.log(`Il tuo numero: ${pixel6.getNumeroTelefono()}`);
//Dichiaro il secondo telefono
console.log("");
console.log("iPHONE13:");
const iPhone13 = new Smartphone(10, "123456789", 1);
//5 minuti di chiamata a 1, costo residuo dovrebbe essere 5
iPhone13.chiamata(5);
console.log(`Costo al minuto: ${iPhone13.getCostoMinuto()}     -     Credito rimasto: ${iPhone13.getCreditoResiduo()}`);
//Faccio altri 5 minuti
iPhone13.chiamata(5);
console.log(`Costo al minuto: ${iPhone13.getCostoMinuto()}     -     Credito rimasto: ${iPhone13.getCreditoResiduo()}`);
//Ora un solo minuto che va in errore
iPhone13.chiamata(1);
//Controllo il numero di telefono
console.log(`Il tuo numero: ${iPhone13.getNumeroTelefono()}`);
//Dichiaro il terzo telefono
console.log("");
console.log("LUMIA:");
const microsoftLumia = new Smartphone(10, "987654321", 200);
//Faccio una chiamata costosissima
microsoftLumia.chiamata(1);
//Aggiungo un sacco di credito e ci riprovo (dovrei cambiare tariffa)
microsoftLumia.ricarica(1000);
microsoftLumia.chiamata(3);
console.log(`Costo al minuto: ${microsoftLumia.getCostoMinuto()}     -     Credito rimasto: ${microsoftLumia.getCreditoResiduo()}`);

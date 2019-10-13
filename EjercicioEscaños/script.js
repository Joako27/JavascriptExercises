"use strict"
//Variables
let name = "",
    votos, sum = 0,
    cont = 0,
    numEscaños, max = 0,
    fila, col;
let mapa = new Map();
let mapa2 = new Map();
let votosPorcentajes;
let sortMap = [];
let arrayBi = [];
let arrayBi2 = [];

//Incializacion de funciones
cargarDatos();
tabla1();
tabla2();
calcularEscaños();
tabla3();
//Funciones
function cargarDatos() {
    name = prompt("Nombre del partido. Si deseas acabar introduce '*':");
    while (name != "*") {
        while (name == "" || !isNaN(name)) {
            name = prompt("Error, Introduce correctamente el nombre del partido.");
        }
        votos = prompt("Votos del partido:");
        while (votos == "" || isNaN(votos)) {
            votos = prompt("Error, Introduce correctamente los votos del partido:");
        }
        votos = parseInt(votos);
        mapa.set(name, votos);
        sum += votos;
        name = prompt("Nombre del partido. Si deseas acabar introduce '*':");
    }
    numEscaños = prompt("Introduce el numero de escaños a repartir:");
    while (isNaN(numEscaños) || numEscaños == "") {
        numEscaños = prompt("Error, Introduce el numero de escaños a repartir correctamente:");
    }
    mapa.forEach((value, key) => {
        votosPorcentajes = (value * 100) / sum;
        mapa2.set(value, votosPorcentajes.toFixed(1));
        sortMap[cont] = value;
        cont++;
    });
    sortMap.sort(function (a, b) {
        return b - a
    })
}

function tabla1() {
    document.write("<table width='600px' border = '1' align = 'CENTER'>");
    document.write("<tr>");
    document.write("<td>Partidos</td>");
    document.write("<td>Votos</td>");
    document.write("<td>%Votos</td>");
    document.write("</tr>");
    for (let index = 0; index < sortMap.length; index++) {
        document.write("<tr>");
        mapa.forEach((value, key) => {
            if (value == sortMap[index]) {
                document.write("<td>" + key + "</td>");
                document.write("<td>" + value + "</td>");
            }
        });
        document.write("<td>" + mapa2.get(sortMap[index]) + "</td>");
        document.write("</tr>");
    }
    document.write("</table>");
    document.write("<br></br>");
}

function tabla2() {
    document.write("<table width='600px' border = '1' align = 'CENTER'>");
    document.write("<tr>");
    document.write("<td>Partidos</td>");
    for (let k = 0; k < numEscaños; k++) {
        document.write("<td>Votos" + (k + 1) + "</td>");
    }
    document.write("</tr>");
    for (let index = 0; index < sortMap.length; index++) {
        document.write("<tr>");
        mapa.forEach((value, key) => {
            if (value == sortMap[index]) {
                if (mapa2.get(sortMap[index]) > 3) {
                    document.write("<td>" + key + "</td>");
                    arrayBi[index] = [];
                    for (let i = 0; i < numEscaños; i++) {
                        document.write("<td>" + (value / (i + 1)) + "</td>");
                        arrayBi[index][i] = (value / (i + 1));
                    }
                }
            }
        });
        document.write("</tr>");
    }
    document.write("</table>");
    document.write("<br></br>");
}

function calcularEscaños() {
    for (let index = 0; index < numEscaños; index++) {
        max = 0;
        for (let i = 0; i < arrayBi.length; i++) {
            for (let j = 0; j < arrayBi[i].length; j++) {
                if (arrayBi[i][j] > max) {
                    max = arrayBi[i][j];
                    fila = i;
                    col = j;
                }
            }
        }
                    if (arrayBi2[fila] == undefined || arrayBi2[fila] == null) {
                        arrayBi2[fila] = 1;
                        arrayBi[fila][col] = 0;
                    } else {
                        arrayBi2[fila]++;
                        arrayBi[fila][col] = 0;
                    }


    }
}

function tabla3() {
    document.write("<table width='600px' border = '1' align = 'CENTER'>");
    document.write("<tr>");
    document.write("<td>Partidos</td>");
    document.write("<td>Escaños</td>");
    document.write("</tr>");
    for (let index = 0; index < sortMap.length; index++) {
        document.write("<tr>");
        mapa.forEach((value, key) => {
            if (value == sortMap[index]) {
                document.write("<td>" + key + "</td>");
                if(arrayBi2[index] != undefined || arrayBi2[index] != null){
                document.write("<td>" + arrayBi2[index] + "</td>");
                } else {
                    document.write("<td>0</td>");
                }
            }
        });
        document.write("</tr>");
    }
        document.write("</table>");
}
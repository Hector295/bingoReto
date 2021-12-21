const express = require('express');
const app = express();
const http = require('http');
const socket= require('socket.io')
const server = http.createServer(app);
const socketio=socket(server);
const path = require('path');
var sleep=require('system-sleep')
server.listen(3000, () => {
    console.log('listening on *:3000');
});
app.get('/', function(req, res) {
    res.send('jola');
});
console.log('conectado');
socketio.on('connection',function (socket){
    socketio.broadcast.emit('msg1','Bienvenidos al BINGO');
})

function generaTarjetBingo() {
    // Crear arreglo con subarreglo para cada columna necesaria
    let arr = [
        [], // B (1-15)
        [], // I (16-30)
        [], // N (31-45)
        [], // G (46-60)
        []  // O (61-75)
    ];
    // Llenar cada subarreglo
    for(let i = 0; i < arr.length; i++) {
        // Asignar máximo y mínimo de acuerdo a posición
        let min = (i * 15) + 1;
        let max = min + 15;
        // Este ciclo termina cuando el subarreglo tenga 5 elementos
        while(arr[i].length < 5) {
            let num = Math.floor(Math.random() * (max - min)) + min;
            // Evitar que se repitan números
            if(!arr[i].includes(num)) {
                arr[i].push(num);
            }
        }
        // Ordenar
        arr[i].sort((a,b) => a - b);
    }
    // Generalmente el número del centro es un comodín
    arr[2][2] = 'FREE';
    return arr;
}

function cartones(jugadores) {
    let arreglo=[];
    for(let i=0;i<jugadores;i++){
        arreglo.push(getBingoCard())
    }
    return arreglo;
}
    //solicitamos el número de jugadores
var jugadores = process.openStdin();
jugadores.addListener("data", function(d) {
    console.log("Número de jugadores del BINGO: " +
        d.toString().trim());
});

var gritoBingo = false;
socketio.on('Bingo',function (socket){
    gritoBingo = true;
})
function numerosSacados(){
    let arraeglo=[];
    for(let i=0;i<75;i++){
        let n=Math.random()*(75-1)+1;
        //ESPERO 5 SEGUNDOS
        sleep(5*1000);
        if(gritoBingo){
            return arraeglo;
        }else{
            if(!arraeglo.includes(n)){
                arraeglo.push(n);
            }
        }
        i++;
    }
    return arraeglo;
}
window.onload=function (){
    const socket=io.connect('http://localhost:3000');
    socket.on('msg1',function (mensaje){
    console.log(mensaje)});
}
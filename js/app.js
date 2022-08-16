if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then( registrado => console.log('Instalado correctamente ', registrado))
        .catch(error => console.log('Falló ',error));
}else{
    console.log('Service workers no soportados');
}
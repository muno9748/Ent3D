if(!createjs.Stage) {
    await $.get('/lib/EaselJS/lib/easeljs-0.8.0.min.js'); /* await import is not working because EaselJS using not 'window' and using 'this' property */
}
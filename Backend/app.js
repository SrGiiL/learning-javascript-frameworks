'use strict'

// Cargar módulos de node para crear servidor
let express = require('express');
let bodyParser = require('body-parser');

// Ejecutar express (http)
let app = express();

// Cargar ficheros rutas
let article_routes = require('./routes/article')

// MiddLewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Añador/Cargar prefijos a rutas
app.use('/api', article_routes);

// Exportar modulo (fichero actual)
module.exports = app;
require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false })) //midelware cada peticion pasa siempre por aqui
app.use(bodyParser.json())

app.get('/usuario', function(req, res) {
    res.json('Bienvenido get consultar, REST TRANSFERENCIA DE ESTADO REPRESENTACIONAL,');
})


app.post('/usuario', function(req, res) { //postman body x-www-form-urlencoded edad 33(bodyParser) body key:edad value:33

    let body = req.body;

    if (body.edad === undefined) {
        res.status(400).json({

            ok: false,
            mensaje: 'La edad debe ser neceario'
        });

    } else {
        res.json({
            persona: body //{"edad":"33"}  //{"persona":{"edad":"33""}}
        });
    }
})


app.put('/usuario/:id', function(req, res) { //id parametro que recibo en la url

    let id = req.params.id; //obtener el parametro de la url
    res.json({
        id
    })
})

app.delete('/usuario', function(req, res) {
    res.json('Eliminar con post');
})



app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto 3000:', process.env.PORT);
})
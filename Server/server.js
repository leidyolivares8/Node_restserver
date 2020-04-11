require('./config/config');
const express = require('express'); //LIBRERIA CREAR APLICACIONES WEB DEL LADO DEL SERVIDOR
const mongoose = require('mongoose'); //LIBRERIA PARA CONECTARNOS A LA BASE DE DATOS MONGO
const bodyParser = require('body-parser')


const app = express();

app.use(bodyParser.urlencoded({ extended: false })) //midelware cada peticion pasa siempre por aqui
app.use(bodyParser.json())


app.use(require('./routes/usuario')); //Enlazar pagina entrada del localhost con usuario GEP-POST-DELETE



//CONEXION A LA BASE DE DATOS EN LA NUBE CONECTAR MLAB O MONGO ATLAS REMOTA Y LOCAL
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');

});

//CONEXION A LA BASE DE DATOS LOCAL
//mongoose.connect('mongodb://localhost:27017/cafe', { useNewUrlParser: true, useCreateIndex: true }, //{esto por mensaje en el git bash}
//    (err, res) => {
//       if (err) throw err;
//       console.log('Base de datos ONLINE');
// });




app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto 3000:', process.env.PORT);
})
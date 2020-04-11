const express = require('express'); //LIBRERIA CREAR APLICACIONES WEB DEL LADO DEL SERVIDOR
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario'); // Modelo de Ususario

const app = express();

//Obtener usuarios bd
app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0; //enviar parametros opcionales desde url: ?limite=10&desde=10
    desde = Number(desde); //Esto lo va a transformar en un numero

    let limite = req.query.limite || 5; // si no me lo especifican el limite entonces 5
    limite = Number(limite);

    Usuario.find({ estado: false }, 'nombre email role estado google img') //Usuario.find({google:true}) trae los reguistros que cumplen a condicion en bd schema -colection-tabla usuario
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => { //exec funcion de mongoose para ejecutar ese find reciben el error o la respuesta (arreglo de usuarios)

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: false }, (err, conteo) => { //count contar registros y hacemos un callback con las respuestas 
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            })


        })
        //res.json('Bienvenido get consultar, REST TRANSFERENCIA DE ESTADO REPRESENTACIONAL,');
});

//Crear un usuario en bd
app.post('/usuario', function(req, res) { //postman body x-www-form-urlencoded edad 33(bodyParser) body key:edad value:33

    let body = req.body;

    let usuario = new Usuario({ //Creamos objeto con estos valores ahora como lo grabamos en la base de datos
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //encriptar la contraseña
        role: body.role
    });

    usuario.save((err, usuarioDB) => { //Grabar en la base de datos
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password = null; //Para no mostrar en la respuesta el password 

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

//   if (body.edad === undefined) {
//       res.status(400).json({
//              ok: false,
//           mensaje: 'La edad debe ser neceario'
//       });
//      } else {
//              res.json({
//              persona: body //{"edad":"33"}  //{"persona":{"edad":"33""}}
//              });
//   }
//});

//Actualizar información del usuario db
app.put('/usuario/:id', function(req, res) { //id parametro que recibo en la url
    let id = req.params.id; //obtener el parametro de la url
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    //recibir la informacion del body
    //libreria underscore npm underscore  pick: regresa una copia del objeto filtrando solo los campos q quiero actualizar si en el postman envien otros 

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => { // pagina mongoosejs Schema finBy para actualizar enviando id
        //runvalidators mongoose nos da la opcion de correr las validaciones que definimas en el schema models

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })
});

//Eliminar por cambiar estado de usuario de la bd
app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioborrado) => { //Cambiar estado a falso, enviar objeto que queremos cambiar 2 arg cambiaEstado

        //Usuario.findByIdAndRemove(id, (err, usuarioborrado) => { //Eliminamos registro de la base de datos

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioborrado) { //(usuarioborrado === null)
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioborrado
        });


    });

});

module.exports = app;
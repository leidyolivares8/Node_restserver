//===================================
//Puerto 
//=================================
//creo variable process.env.PORT para el puerto que sea global
process.env.PORT = process.env.PORT || 3000;



//===================================
//ENTORNO 
//=================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//===================================
//Base de datos 
//=================================

let urlDB;

if (process.env.NODE_ENV === 'dev') { //'dev' ambiente de desarrollo en postman
    urlDB = 'mongodb://localhost:27017/cafe'; //BD LOCAL
} else {
    urlDB = 'mongodb+srv://Leidy_8:<Cdjb5meCPpzCo3zu>@cluster0-rexou.mongodb.net/cafe'; //BD REMOTA falta usuario de MLAB
}

process.env.URLDB = urlDB;
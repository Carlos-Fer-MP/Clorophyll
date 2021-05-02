   /*
       Instanciamos los drivers a usar.  
   
   */ 
 const express = require('express');
 const mongoose = require('mongoose');
 const cors = require('cors');
 require('dotenv/config');

 const app = express();
 
 /*Esto es para poder utilizar el "body-parser"
   esta funcion basicamente nos da más seguridad 
   a la hora de pasar las urls  
 */
 app.use(express.urlencoded({ extended: true }));
 app.use(express.json());
 
 //  
 app.use(cors());   


 app.get('/', (req,res) => {

    res.send('we are home');

 });

 //Exportamos la api.
 const apiRoute = require('./routes/api');
 app.use('/api', apiRoute);


 
 /*Instanciamos y empezamos el server en el puerto 3000 
 o el requerido por el "enviroment".*/
 const port = process.env.PORT || 3000;

 app.listen(port);
 
 //Creamos la conexión a la BD.
 mongoose.connect(process.env.DB_Conection,{ useUnifiedTopology: true }, () => {

   console.log('Conected to db');

 });

 //
 module.exports = app;
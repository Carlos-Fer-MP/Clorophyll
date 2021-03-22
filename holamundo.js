//Este pequeño programa es un tutorial de Express https://expressjs.com/en/starter/hello-world.html

 const express = require('express');
 const app = express();
 const port = 3000;
 
 app.get('/', (req, res) => {

     res.send('Hola Mundo!');
 
 });

 app.listen(port, () => {
     
     /*Esta es la unica parte que modifique para hacer pruebas en mi equipo con mi apache,
     cambie la ruta paso de http://localhost:${port} a localhost://${port}*/

     console.log(`Example app listening at localhost://${port}`)

 });
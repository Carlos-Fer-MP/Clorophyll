 const express = require('express');
 const cors = require('cors');
 
 const app = express();

  var corsOptions ={

    origin: "http://localhost:8081"
     
  };

  app.use(cors(corsOptions));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  /*app.get('/', (req, res) => {

      res.json({message: 'holu'});  

  });*/

  //Declarar las rutas.
  require('./app/routes/routes.js')(app);
  require('./app/routes/auth.routes')(app);
  require('./app/routes/user.routes')(app);

  const port = process.env.PORT || 3000;

  app.listen(port, () => {

      console.log(`Server is running on port ${port}.`);

  });

  const db = require('./app/models');
  const Role = db.role;


  db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
 
  function initial() {

     Role.estimatedDocumentCount((err, count) => {

        if(!err && count === 0){

           new Role({

              name: 'user'

           }).save(err => {

              if(err){

                console.log('error',err);

              }
              console.log('added user to roles collection');
           });

           new Role({

              name: 'admin'

           }).save(err => {

              if(err){

                console.log('error', err);

              }
              console.log('added admin to roles collection');

           });

        }

     });

  }
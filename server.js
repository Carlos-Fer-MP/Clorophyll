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

  require('./app/routes/routes.js')(app);

  const port = process.env.PORT || 3000;

  app.listen(port, () => {

      console.log(`Server is running on port ${port}.`);

  });

  const db = require('./app/models');
  db.mongoose
  .connect(db.url, {
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

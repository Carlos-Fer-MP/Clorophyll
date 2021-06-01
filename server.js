
const express = require('express')
const cors = require('cors')

const app = express()

const corsOptions = {

  origin: 'http://localhost:8081'

}

// Iniciamos el CORS.
app.use(cors(corsOptions))

// Iniciamos el Body-Parseer para "parsear" las URLS.
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/* app.get('/', (req, res) => {

      res.json({message: 'hola'});

  }); */

// Declarar las rutas creadas.
require('./app/routes/routes.js')(app)
require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)

// Iniciamos el puerto en el Puerto de "enviroment" o en el 8081 y luego lo dejamos "escuchado".
const port = process.env.PORT || 8081

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
})

// Inicializamos la base de datos y los modelos usados.
const db = require('./app/models')
const Role = db.role

db.mongoose
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connectado a la Base de Datos!')
  })
  .catch(err => {
    console.log('No se puede connectar a la Base de Datos!', err)
    process.exit()
  })

function initial () {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({

        name: 'user'

      }).save(err => {
        if (err) {
          console.log('error', err)
        }
        console.log('Agregado ususario a la collección de Roles')
      })

      new Role({

        name: 'admin'

      }).save(err => {
        if (err) {
          console.log('error', err)
        }
        console.log('Agregado administrador a la collección de Roles')
      })
    }
  })
}

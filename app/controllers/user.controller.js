
exports.allAcces = (req, res) => {
  res.status(200).send('Contenido Publico')
}

exports.usersBoard = (req, res) => {
  res.status(200).send('Contenido del Usuario')
}

exports.adminBoard = (req, res) => {
  res.status(200).send('Contenido del Administrador')
}

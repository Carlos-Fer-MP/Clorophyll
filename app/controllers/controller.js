
const db = require('../models/index')

const Productos = db.Productos

exports.create = (req, res) => {
  //
  if (!req.body._id) {
    res.status(400).send({ message: 'Uy ha habido un error' })
    return
  }
  //
  const productos = new Productos({

    _id: req.body._id,
    cantidad: req.body.cantidad,
    precio: req.body.precio,
    fecha: req.body.fecha

  })

  productos
    .save(productos)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Se ha producido un error al crear el Producto.'
      })
    })
}

exports.findAll = (req, res) => {
  const item = req.query.item
  const condition = item ? { item: { $regex: new RegExp(item), $options: 'i' } } : {}

  Productos.find(condition)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
            err.message || 'Un error a ocurrido al buscar el producto con la id.'
      })
    })
}
exports.findOne = (req, res) => {
  const id = req.params._id

  Productos.findById(id)
    .then(data => {
      if (!data) { res.status(404).send({ message: 'Error al buscar el producto con la id ' + id }) } else res.send(data)
    })
    .catch(() => {
      res
        .status(500)
        .send({ message: 'Error al buscar el producto con la id=' + id })
    })
}
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Los datos a actualizar no pueden estar vacios!'
    })
  }

  const id = req.params._id

  Productos.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se a podido actualizar el producto con la id=${id}. Quiza no se a podido emncontrar el producto`
        })
      } else res.send({ message: 'El producto ha sido actualizado con exito.' })
    })
    .catch(() => {
      res.status(500).send({
        message: 'Error actualizando el Producto con la id=' + id
      })
    })
}
exports.delete = (req, res) => {
  const id = req.params._id

  Productos.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se a podido eliminar el producto con la id=${id}. Quiza no se a podido emncontrar el producto`
        })
      } else {
        res.send({
          message: 'El producto ha sido eliminados!'
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'No se a podido eliminar el producto con la id=' + id
      })
    })
}
exports.deleteAll = (req, res) => {
  Productos.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Los productos han sido eliminados`
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'A ocurrido un error al eliminar el producto.'
      })
    })
}


const db = require('../models/index');

const Productos = db.Productos;


 exports.create = (req, res) => {
    
    //
    if(!req.body._id){

        res.status(400).send({ message: 'Uy ha habido un error'});
        return;
    }
    //
    const productos = new Productos({

        _id: req.body._id,
        cantidad: req.body.cantidad,
        precio: req.body.precio,
        fecha: req.body.fecha

    });

    productos
    .save(productos)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se ha producido un error al crear el Producto."
      });
    });
};

 exports.findAll = (req, res) => {
    
    const item = req.query.item;
    var condition = item ? { item: { $regex: new RegExp(item), $options: "i" } } : {};
  
    Productos.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      }); 
 
 };
 exports.findOne = (req, res) => {
    
    const id = req.params._id;

    Productos.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });
 
 };
 exports.update = (req, res) => {
    
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
    const id = req.params._id;
    
    Productos.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else res.send({ message: "Tutorial was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
 
 };
 exports.delete = (req, res) => {
 
    const id = req.params._id;

    Productos.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
 
 };
 exports.deleteAll = (req, res) => {
 
    Productos.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
     
 };

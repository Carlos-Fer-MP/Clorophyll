
 module.exports = app => {

    const productos = require('../controllers/controller.js');

    const router = require('express').Router();

    router.post('/', productos.create);

    router.get('/', productos.findAll);

    //Encontrar uno especifico.

    router.get('/', productos.findOne);

    router.put('/', productos.update);

    router.delete('/', productos.delete);

    router.delete('/', productos.deleteAll);

    app.use('/api/productos', router);
 };
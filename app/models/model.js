
module.exports = mongoose => {
    const Productos = mongoose.model(
      "productos",
      mongoose.Schema(
        {
          _id: Number, 
          cantidad: Number,
          fecha: Date,
          item: String,
          precio: Number
        },
        { timestamps: true }
      )
    );
  
    return Productos;
  };
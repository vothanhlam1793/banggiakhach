module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            code: String,
            name: String,
            price: String,
            type: String,
            info: Object,
            images: Array,
            description: String,
            inventory: Number,
            status: String
        },
        { 
            timestamps: true 
        }
    );
  
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
  
    const Product = mongoose.model("product", schema);
    return Product;
  };
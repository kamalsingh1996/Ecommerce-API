const Product = require('../models/product');

// function to show all the products
module.exports.products = async function(req, res){
    try{
        let foundProducts = await Product.find({});
        res.send(foundProducts);
    }
    catch(err){
        res.send(err);
    }
}

// function to create a new product
module.exports.create = async function(req, res){   
    try{
        const newProduct = new Product({
            name: req.body.name,
            quantity: req.body.quantity
        });
        await newProduct.save();
        res.send('New product added successfully.');
    }
    catch(err){
        res.send(err);
    }
}

// function to delete a product using it's ID
module.exports.delete = async function(req, res){
    try{
        await Product.deleteOne({_id: req.params.productID});
        res.send({
            message: "Product deleted"
        });
    }
    catch(err){
        res.send(err);
    }  
}

// function to update a product's quantity
module.exports.updateQunatity = async function(req, res){
    const ID = req.params.productID;
    // find the product using id
    try{
        let found = await  Product.findById(ID);
        // Note - To increment the quantity of the product put number as a positive value in the query 
        // and to decrement the quantity put the number as negative value in the query
        const newQty = parseInt(found.quantity) + parseInt(req.query.number);
        
        // update the product's quantity
        let updatedProduct = await Product.findByIdAndUpdate(ID, {quantity: newQty});
        updatedProduct.quantity = newQty;
        res.send({
            product: updatedProduct,
            message: 'updated successfully'
        });
    }
    catch(err){
        res.send(err);
    }  
}
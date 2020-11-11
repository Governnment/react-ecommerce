import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//? @desk     Fetch all producs
//? @rout     GET /api/products
//? @access   Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

//? @desk     Fetch all produc
//? @rout     GET /api/products>:id
//? @access   Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//? @desk     Delete a product
//? @rout     DELETE /api/products/:id
//? @access   Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById, deleteProduct }

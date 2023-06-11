import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  title: String,
  image: String,
  description: String,
  author: String,
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
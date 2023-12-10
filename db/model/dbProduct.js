import mongoose from "mongoose";

const Product = mongoose.model("product", {
  nama: {
    type: String,
    required: true,
  },
  tipe: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

// const product1 = new Product({
//   nama: "samsung",
//   tipe: "laptop",
//   harga: 2000000,
//   desc: "cor i7 ssd 256 gb ram 4",
// });

// product1.save().then((data) => console.log(data));

export default Product;

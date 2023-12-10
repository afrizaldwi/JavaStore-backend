import mongoose from "mongoose";

const CheckoutHistory = mongoose.model("checkoutHistory", {
  username: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  tipe: {
    type: String,
    required: true,
  },
  hargaAwal: {
    type: Number,
    required: true,
  },
  hargaAkhir: {
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

// const product1 = new CheckoutHistory({
//   nama: "samsung",
//   tipe: "laptop",
//   harga: 2000000,
//   image: "IMG_123289123",
//   desc: "cor i7 ssd 256 gb ram 4",
// });

// product1.save().then((data) => console.log(data));

export default CheckoutHistory;

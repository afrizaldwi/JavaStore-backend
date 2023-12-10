import Product from "../../db/model/dbProduct.js";
import fs from "fs";

// Menambahkan data product baru
const postProduct = async (req, res) => {
  try {
    const { nama, tipe, harga, desc } = req.body;
    const image = req.file.filename;

    const newProduct = new Product({
      nama,
      tipe,
      harga,
      image,
      desc,
    });

    await newProduct.save();

    const response = {
      status: "success",
      message: "Data product berhasil ditambahkan",
      newProduct,
    };
    res.status(201).json(response);
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };
    res.status(404).json(response);
  }
};

// Menampilkan semua data product
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const response = {
      status: "success",
      products,
    };
    res.json(response);
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };
    res.status(404).json(response);
  }
};

// Menampilkan data product berdasarkan id
const getProductById = async (req, res) => {
  try {
    const dataId = req.params._id;
    const product = await Product.findById(dataId);

    const response = {
      status: "success",
      product,
    };
    res.json(response);
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };
    console.log(response);
    res.status(404).json(response);
  }
};

// Mengedit data product berdasarkan id
const putProduct = async (req, res) => {
  try {
    const editProduct = await Product.updateOne(
      { _id: req.params._id },
      {
        $set: {
          nama: req.body.nama,
          tipe: req.body.tipe,
          harga: req.body.harga,
          desc: req.body.desc,
        },
      }
    );
    const response = {
      status: "success",
      message: "Data berhasil diubah",
      editProduct,
    };
    res.status(201).json(response);
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };
    res.status(404).json(response);
  }
};

// Menghapus data product bersadarkan id
const deleteProductById = async (req, res) => {
  try {
    const productId = req.params._id;
    const product = await Product.findByIdAndDelete(productId);

    const filePath = `public/images/product/${product.image}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      }
    });

    const response = {
      status: "success",
      message: "Data berhasil dihapus",
    };
    console.log(response)
    res.json(response);
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };
    res.status(404).json(response);
  }
};

export { getProducts, getProductById, postProduct, putProduct, deleteProductById };

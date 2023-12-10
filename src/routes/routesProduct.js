import { Router } from "express";
import {
  deleteProductById,
  getProducts,
  getProductById,
  postProduct,
  putProduct,
} from "../handler/handlerProducts.js";
import multer from "multer";
import path from "path";

// konfigurasi untuk menyimpan gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/product");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const routerProduct = Router();
routerProduct.post("/product", upload.single("image"), postProduct);
routerProduct.get("/product", getProducts);
routerProduct.get("/product/:_id", getProductById);
routerProduct.put("/product/:_id", putProduct);
routerProduct.delete("/product/:_id", deleteProductById);

export default routerProduct;

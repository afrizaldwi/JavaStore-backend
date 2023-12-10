import Product from "../../db/model/dbProduct.js";

async function postSearch(req, res) {
  try {
    const query = req.body.query;

    if (!query) {
      throw new Error("Query kosong");
    }

    //menggunakan regular expression mongodb
    // const filteredProduct = await Product.find({ nama: { $regex: query, $options: "i" } });

    const products = await Product.find();
    const filteredProduct = products.filter((product) =>
      product.nama.toLowerCase().includes(query.toLowerCase())
    );


    const response = {
      status: "success",
      data: filteredProduct,
    };

    res.json(response);
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };

    console.log(response);

    res.json(response);
  }
}

export { postSearch };

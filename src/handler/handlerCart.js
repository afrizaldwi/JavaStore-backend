import Cart from "../../db/model/dbCart.js";

async function postCart(req, res) {
  try {
    const { cartId, username, nama, tipe, hargaAwal, hargaAkhir, image, desc } = req.body;
    const cartData = new Cart({
      cartId,
      username,
      nama,
      tipe,
      hargaAwal,
      hargaAkhir,
      image,
      desc,
    });

    await cartData.save();

    const response = {
      status: "success",
      cartData,
    };
    res.status(201).json(response);
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };
    res.status(404).json(response);
  }
}

async function getCarts(req, res) {
  try {
    const cartDatas = await Cart.find();

    const response = {
      status: "success",
      cartDatas,
    };
    res.status(201).json(response);
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };
    res.status(404).json(response);
  }
}

async function deleteCart(req, res) {
  try {
    const dataId = req.params._id;
    await Cart.findByIdAndDelete(dataId);

    const response = {
      status: "success",
      message: "Data berhasil dihapus",
    };
    res.status(201).json(response);
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };
    res.status(404).json(response);
  }
}

export { postCart, getCarts, deleteCart };

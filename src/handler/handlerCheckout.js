import Checkout from "../../db/model/dbCheckout.js";
import Cart from "../../db/model/dbCart.js";
import CheckoutHistory from "../../db/model/dbHistoryCheckout.js";

const checkout = async (req, res) => {
  try {
    const checkoutDataArray = req.body;

    let insertedCheckoutData;

    if (checkoutDataArray.length >= 1) {
      const data = checkoutDataArray.map((data) => ({
        cartId: data._id,
        username: data.username,
        nama: data.nama,
        tipe: data.tipe,
        hargaAwal: data.hargaAwal,
        hargaAkhir: data.hargaAkhir,
        image: data.image,
        desc: data.desc,
      }));

      // console.log(data);
      console.log(checkoutDataArray);

      console.log(checkoutDataArray.length);

      insertedCheckoutData = await Checkout.insertMany(data);
    } else {
      console.log(checkoutDataArray);
      console.log(checkoutDataArray.length);
      insertedCheckoutData = await Checkout.insertMany(checkoutDataArray);
    }

    const response = {
      status: "success",
      checkoutData: insertedCheckoutData,
    };
    res.status(201).json(response);
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };
    res.status(404).json(response);
    console.log(response);
  }
};

const getCheckout = async (req, res) => {
  try {
    const checkoutData = await Checkout.find();

    const response = {
      status: "success",
      checkoutData,
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

const getAndDeleteCheckout = async (req, res) => {
  try {
    const checkoutDataArray = req.body;

    const checkoutIds = checkoutDataArray.map((item) => item.cartId);

    const deleteCheckoutData = await Checkout.deleteMany({});

    console.log(checkoutIds);

    let deleteCartData;

    // if (checkoutIds.length > 1) {
    deleteCartData = await Cart.deleteMany({ _id: { $in: checkoutIds } });
    // } else {
    //   deleteCartData = await Cart.deleteOne({ _id: { $in: checkoutIds } });
    // }

    const response = {
      status: "success",
      deleteCheckoutData,
      deleteCartData,
    };
    console.log(response);
    res.json(response);
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };
    res.status(404).json(response);
  }
};

const deleteAllCheckoutData = async (req, res) => {
  try {
    await Checkout.deleteMany({});
    const response = {
      status: "success",
      message: "data berhasil dihapus",
    };
    res.json(response);
    console.log(response);
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };
    res.json(response);
    console.log(response);
  }
};

const getCheckoutHistory = async (req, res) => {
  try {
    const checkoutDataHistory = await CheckoutHistory.find();

    const response = {
      status: "success",
      dataHistory: checkoutDataHistory,
    };
    res.json(response);
    console.log(response);
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };
    res.json(response);
    console.log(response);
  }
};

export { checkout, getCheckout, getAndDeleteCheckout, deleteAllCheckoutData, getCheckoutHistory };

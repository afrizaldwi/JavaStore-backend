import { Router } from "express";
import { deleteCart, getCarts, postCart } from "../handler/handlerCart.js";

const routerCart = Router();

routerCart.post("/cart", postCart);
routerCart.get("/cart", getCarts);
routerCart.delete("/cart/:_id", deleteCart);

export default routerCart;

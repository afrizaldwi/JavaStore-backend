import { Router } from "express";
import {
  checkout,
  deleteAllCheckoutData,
  getAndDeleteCheckout,
  getCheckout,
  getCheckoutHistory,
} from "../handler/handlerCheckout.js";

const routerCheckout = Router();

routerCheckout.post("/checkout", checkout);
routerCheckout.get("/checkout", getCheckout);
routerCheckout.get("/checkoutHistory", getCheckoutHistory);
routerCheckout.post("/checkoutData", getAndDeleteCheckout);
routerCheckout.delete("/checkout", deleteAllCheckoutData);

export default routerCheckout;

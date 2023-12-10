import { Router } from "express";
import {
  deleteUser,
  loginAdmin,
  loginUser,
  logout,
  registerUser,
} from "../handler/handlerLogin.js";

const routerLogin = Router();

routerLogin.post("/login", loginUser);
routerLogin.post("/loginAdmin", loginAdmin);
routerLogin.post("/register", registerUser);
routerLogin.get("/logout", logout);
routerLogin.delete("/user/:_id", deleteUser);

export default routerLogin;

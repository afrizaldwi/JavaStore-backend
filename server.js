import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import "./db/db.js";
import routerProduct from "./src/routes/routesProduct.js";
import routerLogin from "./src/routes/routesLogin.js";
import routerUsers from "./src/routes/routesUsers.js";
import routerCheckout from "./src/routes/routesCheckout.js";
import routerCart from "./src/routes/routesCart.js";
import routerSearch from "./src/routes/routesSearch.js";

const app = express();
const PORT = 10000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));

app.use(routerProduct);
app.use(routerLogin);
app.use(routerUsers);
app.use(routerCart);
app.use(routerCheckout);
app.use(routerSearch);

app.get("/varify", (req, res) => {
  try {
    const token = req.cookies.cookieToken;
    if (token) {
      jwt.verify(token, "jwt-secret-key", (err, decoded) => {
        if (err) {
          const response = {
            status: "fail",
            message: "Error with token",
          };
          res.json(response);
        } else {
          const response = {
            status: "success",
            id: decoded._id,
            username: decoded.username,
            role: decoded.role,
          };
          res.json(response);
        }
      });
    } else {
      const response = {
        status: "fail",
        message: "not login",
      };

      res.clearCookie("cookieToken").json(response);
    }
  } catch (error) {
    const response = {
      status: "fail",
      message: error.message,
    };
    res.status(404).json(response);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});

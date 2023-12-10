import { Router } from "express";
import { getUsers } from "../handler/handlerUsers.js";

const routerUsers = Router();

routerUsers.get("/users", getUsers);

export default routerUsers;

import { Router } from "express";
import { postSearch } from "../handler/handlerSearch.js";

const routerSearch = Router();

routerSearch.post("/search", postSearch);

export default routerSearch;

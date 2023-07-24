import express from "express";
import {
  addUser,
  getUser,
  deleteUser,
  editUser,
  updateUser,
} from "../Contollers/UserController.js";

const router = express.Router();

router.post("/add", addUser);
router.get("/all", getUser);
router.delete("/all/:id", deleteUser);
router.get("/edit/:id", editUser);
router.put("/edit/:id", updateUser);

export default router;

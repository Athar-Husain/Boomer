import express from "express";
import {
  AdminLogin,
  AdminRegister,
  getAdmin,
  getAdminLoginStatus,
} from "../Controllers/AdminController.js";
import { AdminProtect } from "../Middlewares/authMIddleware.js";

const router = express.Router();

router.post("/AdminRegister", AdminRegister);
router.post("/AdminLogin", AdminLogin);

router.get("/getAdmin", AdminProtect, getAdmin);
router.get("/getAdminLoginStatus", AdminProtect, getAdminLoginStatus);

export default router;

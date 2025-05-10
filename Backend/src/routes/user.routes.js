import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  updatedUserAvatar,
  updatedUserCoverImage,
  updateAccountDetails,
  changeCurrentPassword,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { sendOtp, verifyOtp } from "../controllers/otp.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/updateAccountDetails").post(verifyJWT, updateAccountDetails);
router.route("/changeCurrentPassword").post(verifyJWT, changeCurrentPassword);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/getCurrentUser").get(verifyJWT, getCurrentUser);

router
  .route("/update-avatar")
  .post(
    verifyJWT,
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    updatedUserAvatar
  );
router
  .route("/update-coverImage")
  .post(
    verifyJWT,
    upload.fields([{ name: "coverImage", maxCount: 1 }]),
    updatedUserCoverImage
  );
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
export default router;

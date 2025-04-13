import asyncHandler from "../utils/asynchandler.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User registered" });
});
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "user is logged in welcome to the screen" });
});
export { registerUser, loginUser };

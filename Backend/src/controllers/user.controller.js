import asyncHandler from "../utils/asynchandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from the frontend
  // validation - not empty
  // check if user already exists - username or email
  // upload avatar and cover image to cloudinary
  // create user object  - create entry in db
  // remove passwrd and refresh token from the user object
  // send response to the frontend
  // check for user creation
  // return res

  const { fullName, email, username, password } = req.body;
  if (
    [fullName, email, username, password].some(
      (field) => !field || field.trim() === ""
    ) //this will check if any of the fields is empty or contains only spaces and also check for the undefined and null ass well
  ) {
    res.status(400);
    throw new ApiError(400, "Please fill all the fields");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "Username or email is already exist");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path || "";

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    email,
    username: username.toLowerCase(),
    password,
    coverImage: coverImage?.url || "",
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(404, "Something went wrong while registering the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {});
export { registerUser, loginUser };

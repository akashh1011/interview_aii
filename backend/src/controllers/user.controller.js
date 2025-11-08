import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.util.js";
import {asyncHandler} from "../utils/asyncHandler.util.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { generateAccessAndRefreshTokens } from "../utils/generateAandTokens.util.js";

// user register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ email });



  if (existedUser) {
    throw new ApiError(409, "User already exists with this email");
  }

  const user = await User.create({
    name,
    email,
    password,
  
  });

  const createdUser = await User.findById(user._id).select(
    "-password"
  );

  if (!createdUser) {
    throw new ApiError(500, "Unable to create user. Please try again later.");
  }
  if (!createdUser) {
    throw new ApiError(403, error);
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    throw new ApiError(400, "Email or Password is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found with this email");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password "
  );

  const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // only true in prod
  sameSite: "lax",
};



  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in Successfully"
      )
    );
});

// logout user

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // only true in prod
  sameSite: "lax",
};


  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(201, {}, "User logged out Successfully"));

});

export { registerUser, loginUser,logoutUser };

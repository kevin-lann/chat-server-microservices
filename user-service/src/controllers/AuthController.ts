import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../database";
import { ApiError, encryptPassword, isPasswordMatch } from "../utils";
import config from "../config/config";
import { IUser } from "../database";
import asyncHandler from "../middlewares/asyncHandler";

const jwtSecret = config.JWT_SECRET as string
const COOKIE_EXPIRATION_DAYS = 90
const cookieOptions = {
  expires:  new Date(Date.now() + COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000),
  secure: false,
  httpOnly: true,
}

export const register = asyncHandler(async (req: Request, res: Response) => { 
  try {
    const {name, email, password} = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
      throw new ApiError(400, "User Already Exists!")
    }
    
    const user = await User.create({
      name,
      email,
      password: await encryptPassword(password),
    })

    // The response data that we need to send back
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email
    }

    return res.json({
      status: 200,
      message: "User registered successfully!",
      data: userData,
    });
  } catch(error: any) {
    return res.json({
      status: 500,
      message: error.message,
    })
  }
})

const createSendToken = async (user: IUser, res: Response) => {
  const {name, email, id } = user
  const token = jwt.sign({name, email, id}, jwtSecret, {
    expiresIn: "1d",
  })
  if (config.env === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
}

export const login = asyncHandler(async (req: Request, res: Response) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (
          !user ||
          !(await isPasswordMatch(password, user.password as string))
      ) {
          throw new ApiError(400, "Incorrect email or password");
      }

      const token = await createSendToken(user!, res);

      return res.json({
          status: 200,
          message: "User logged in successfully!",
          token,
      });
  } catch (error: any) {
      return res.json({
          status: 500,
          message: error.message,
      });
  }
});
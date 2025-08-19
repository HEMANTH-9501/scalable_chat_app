import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface LoginPayLoadType {
  name: string;
  email: string;
  provider: string; // lowercase
  oauth_id: string;
  image?: string;
}

class AuthController {
  static async login(request: Request, response: Response) {
    try {
      const body: LoginPayLoadType = request.body;

      // check user
      let findUser = await prisma.user.findUnique({
        where: { email: body.email },
      });

      // create if not exists
      if (!findUser) {
        findUser = await prisma.user.create({
          data: {
            name: body.name,
            email: body.email,
            provider: body.provider,
            oauth_id: body.oauth_id,
            image: body.image,
          },
        });
      }

      // jwt payload
      const JWTPayload = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      };

      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET as string, {
        expiresIn: "365d",
      });

      return response.json({
        message: "Logged in successfully",
        user: {
          ...findUser,
          token: `Bearer ${token}`, // ✅ fixed
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      return response
        .status(500)
        .json({ error: "Something went wrong, please try again later" });
    }
  }
}

export default AuthController;

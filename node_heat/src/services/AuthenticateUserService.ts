import axios from "axios";
import { sign } from "jsonwebtoken";
import prismaClient from "../prisma";

interface IAccessTokenResponse{
  access_token: string;
}

interface IUserInfoResponse{
  id: number;
  login: string;
  avatar_url: string;
  name: string;
}

class AuthenticateUserService{
  async execute(code: string){
    const url = "https://github.com/login/oauth/access_token";

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params:{
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers:{
        "Accept": "application/json"
      }
    });

    const response = await axios.get<IUserInfoResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`,
      }
    });

    const { id, login, name, avatar_url } = response.data;

    let user = await prismaClient.user.findFirst({
      where: { github_id: id }
    });

    if (!user){
      user = await prismaClient.user.create({
        data: {
          name,
          login,
          avatar_url,
          github_id: id,
        }
      });
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_ur: user.avatar_url,
          id: user.id
        }
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d',
      }
    )

    return { token, user };
  }
}

export { AuthenticateUserService }
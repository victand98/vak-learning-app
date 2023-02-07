import { UserService } from "@/lib";
import { APIError } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Correo",
          type: "email",
          placeholder: "usuario@email.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "••••••••",
        },
      },
      authorize: async (credentials) => {
        if (credentials !== undefined) {
          try {
            const { data } = await UserService.signin(credentials);
            return {
              ...data.user,
              accessToken: data.token,
              name: `${data.user.firstName} ${data.user.lastName}`,
              image: null,
            };
          } catch (error) {
            const errorMessage = (error as APIError).errors[0].message;
            throw new Error(errorMessage);
          }
        }
        return null;
      },
    }),
  ],

  pages: { signIn: "/ingresar", error: "/ingresar" },

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) return { ...token, accessToken: user.accessToken };
      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);

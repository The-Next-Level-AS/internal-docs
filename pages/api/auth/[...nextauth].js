import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "NXTL credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ username, password }) {
        if (username === "mikael" && password === process.env.MIKAEL_PASSWORD) {
          return { id: 1, name: "Mikael", email: "mikael@nxtl.ai" };
        }
        if (username === "per" && password === process.env.PER_PASSWORD) {
          return { id: 2, name: "Per", email: "per@nxtl.ai" };
        }
        if (username === "ingvar" && password === process.env.INGVAR_PASSWORD) {
          return { id: 3, name: "Ingvar", email: "ingvar@ring.no" };
        }

        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);

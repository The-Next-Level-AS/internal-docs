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

        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
